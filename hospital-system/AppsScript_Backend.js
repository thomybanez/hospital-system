const SHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Make sure to set this if not already set globally
const SHEET_NAME = "Records";
const SHEET_AUTH = "Authentication";

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

function getAuthSheet() {
  let ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_AUTH);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_AUTH);
    sheet.appendRow(["Username", "Password"]);
  }
  return sheet;
}

// ── ROUTER ──────────────────────────────────────────────
function doGet(e) {
  const action = e.parameter.action;
  if (action === "getRecords") return getRecordsAPI();
  return json({ success: false, error: "Invalid action" });
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); }
  catch { return json({ success: false, error: "Bad JSON" }); }

  const action = body.action;
  if (action === "login")               return loginAPI(body.username, body.password);
  if (action === "register")            return registerAPI(body.username, body.password);
  if (action === "submitData")          return submitDataAPI(body.data);
  if (action === "updateRecord")        return updateRecordAPI(body.data);
  if (action === "deleteRecord")        return deleteRecordAPI(body.rowIndex);
  if (action === "extractPatientData")  return extractPatientDataAPI(body.base64Image, body.mediaType);
  return json({ success: false, error: "Invalid action" });
}

// ── AUTHENTICATION ──────────────────────────────────────
function loginAPI(username, password) {
  // Hardcoded admin fallback
  if (username === "admin" && password === "admin") {
    return json({ success: true });
  }

  const sheet = getAuthSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username && String(data[i][1]) === String(password)) {
      return json({ success: true });
    }
  }
  return json({ success: false, error: "Invalid username or password" });
}

function registerAPI(username, password) {
  const sheet = getAuthSheet();
  const data = sheet.getDataRange().getValues();
  
  // Check if user already exists
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username) {
      return json({ success: false, error: "Username already exists" });
    }
  }
  
  sheet.appendRow([username, password]);
  return json({ success: true });
}

// ── GET RECORDS ─────────────────────────────────────────
function getRecordsAPI() {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const rows = values.slice(1);

  const SKIP_COLS = new Set([15, 16]);

  const safeRows = rows.map((row, i) => {
    const filtered = [];
    for (let c = 1; c <= row.length; c++) {
      if (SKIP_COLS.has(c)) continue;
      const cell = row[c - 1];
      if (cell instanceof Date) {
        const y = cell.getFullYear();
        const m = String(cell.getMonth() + 1).padStart(2, '0');
        const d = String(cell.getDate()).padStart(2, '0');
        filtered.push(`${y}-${m}-${d}`);
      } else {
        filtered.push(cell);
      }
    }
    return [i + 2, ...filtered];
  });

  return json({ success: true, headers, data: safeRows });
}

// ── SUBMIT NEW ──────────────────────────────────────────
function submitDataAPI(data) {
  const sheet = getSheet();
  sheet.appendRow([
    data.fullname, data.rank, data.bos, data.afpsn, data.age,
    data.regno, data.dob, data.religion, data.height, data.weight,
    data.unit, data.admitted, data.transin, data.diagnosis,
    data.surgery || "", data.surgerydate || "",
    data.allergies, data.safety, data.sex, data.address, data.civilstatus,
    new Date()
  ]);
  return json({ success: true });
}

// ── UPDATE ──────────────────────────────────────────────
function updateRecordAPI(data) {
  const sheet = getSheet();
  const r = parseInt(data.rowIndex);
  const existingSurgery = sheet.getRange(r, 15, 1, 2).getValues()[0];

  const vals = [
    data.fullname, data.rank, data.bos, data.afpsn, data.age,
    data.regno, data.dob, data.religion, data.height, data.weight,
    data.unit, data.admitted, data.transin, data.diagnosis,
    existingSurgery[0], existingSurgery[1],
    data.allergies, data.safety, data.sex, data.address, data.civilstatus
  ];
  sheet.getRange(r, 1, 1, 21).setValues([vals]);
  return json({ success: true });
}

// ── DELETE ──────────────────────────────────────────────
function deleteRecordAPI(rowIndex) {
  getSheet().deleteRow(parseInt(rowIndex));
  return json({ success: true });
}

// ── GEMINI EXTRACTION ───────────────────────────────────
const EXPECTED_KEYS = [
  "fullname", "rank", "bos", "afpsn", "age",
  "regno", "dob", "religion", "height", "weight",
  "unit", "admitted_date", "admitted_time", "transin",
  "diagnosis", "surgery", "surgerydate",
  "allergies", "safety", "sex", "address", "civilstatus"
];

function extractPatientDataAPI(base64Image, mediaType) {
  const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!apiKey) {
    return json({
      status: "error",
      data: {},
      error: { code: "MISSING_API_KEY", message: "GEMINI_API_KEY not set in Script Properties." }
    });
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    apiKey;

  const prompt = `You are a medical form data extractor. Extract patient data from the image.

STRICT OUTPUT RULES:
- Return ONLY a single valid JSON object
- No markdown, no code fences, no explanation, no extra text
- All values must be strings (even numbers and dates)
- If a field is not found, use empty string ""
- Do NOT omit any key
- Do NOT add any key not in the schema
- Start output with { and end with }

SCHEMA (return exactly these keys):
{
  "fullname": "",
  "rank": "",
  "bos": "",
  "afpsn": "",
  "age": "",
  "regno": "",
  "dob": "",
  "religion": "",
  "height": "",
  "weight": "",
  "unit": "",
  "admitted_date": "",
  "admitted_time": "",
  "transin": "",
  "diagnosis": "",
  "surgery": "",
  "surgerydate": "",
  "allergies": "",
  "safety": "",
  "sex": "",
  "address": "",
  "civilstatus": ""
}`;

  const payload = {
    contents: [{
      parts: [
        {
          inline_data: {
            mime_type: mediaType || "image/jpeg",
            data: base64Image
          }
        },
        { text: prompt }
      ]
    }],
    generationConfig: {
      temperature: 0,
      maxOutputTokens: 1500
    }
  };

  let res;
  try {
    res = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
  } catch (networkErr) {
    return json({
      status: "error",
      data: {},
      error: { code: "NETWORK_ERROR", message: networkErr.message }
    });
  }

  let result;
  try {
    result = JSON.parse(res.getContentText());
  } catch {
    return json({
      status: "error",
      data: {},
      error: { code: "GEMINI_RESPONSE_PARSE_FAILURE", message: "Could not parse Gemini HTTP response." }
    });
  }

  if (result.error) {
    return json({
      status: "error",
      data: {},
      error: { code: "GEMINI_API_ERROR", message: result.error.message }
    });
  }

  let raw = "";
  try {
    raw = result.candidates[0].content.parts.map(p => p.text || "").join("").trim();
  } catch {
    return json({
      status: "error",
      data: {},
      error: { code: "GEMINI_EMPTY_RESPONSE", message: "No content returned from Gemini." }
    });
  }

  const cleaned = extractJSON(raw);
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return json({
      status: "error",
      data: {},
      error: {
        code: "JSON_PARSE_FAILURE",
        message: "Gemini output could not be parsed as JSON. Raw: " + raw.substring(0, 300)
      }
    });
  }

  const sanitized = {};
  for (const key of EXPECTED_KEYS) {
    const val = parsed[key];
    sanitized[key] = (val !== undefined && val !== null) ? String(val).trim() : "";
  }

  return json({ status: "success", data: sanitized, error: { code: null, message: null } });
}

function extractJSON(text) {
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const start = text.indexOf("{");
  const end   = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.substring(start, end + 1);
  }
  return text;
}

// ── HELPER ──────────────────────────────────────────────
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
