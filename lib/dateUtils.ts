/**
 * Safely parse a variety of date formats commonly used across the API:
 * - DD-MM-YYYY or DD/MM/YYYY (e.g. "15-08-2024", "15/08/2024")
 * - YYYY-MM-DD (e.g. "2024-08-15")
 * - YYYY-MM-DD HH:mm:ss (e.g. "2024-08-15 14:30:00")
 * - ISO 8601 (e.g. "2024-08-15T07:30:00.000000Z")
 */
export function parseDate(dateString?: string | null): Date | null {
  if (!dateString) return null;
  const trimmed = String(dateString).trim();
  if (!trimmed) return null;

  // Check DD-MM-YYYY or DD/MM/YYYY (e.g. 15-08-2024 or 15/08/2024)
  const dmyMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const parsed = new Date(year, month, day);
    if (!isNaN(parsed.getTime())) return parsed;
  }

  // Check YYYY-MM-DD or ISO (standardize space to T for cross-browser safety)
  const isoFormatted = trimmed.replace(
    /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/,
    "$1T$2"
  );
  const parsed = new Date(isoFormatted);
  if (!isNaN(parsed.getTime())) return parsed;

  return null;
}

/**
 * Format a date string into a localized, human-readable date.
 * Example:
 * - en: "15 August 2024"
 * - id: "15 Agustus 2024"
 */
export function formatLocalizedDate(
  dateString?: string | null,
  locale: string = "en",
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }
): string {
  if (!dateString) return "";
  const parsed = parseDate(dateString);
  if (!parsed) return dateString;

  return new Intl.DateTimeFormat(
    locale === "id" ? "id-ID" : "en-GB",
    options
  ).format(parsed);
}

/**
 * Convert a date string into an ISO YYYY-MM-DD format for HTML <time dateTime="..."> tags or SEO markup.
 */
export function toISODateString(dateString?: string | null): string {
  if (!dateString) return "";
  const parsed = parseDate(dateString);
  if (!parsed) return dateString;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
