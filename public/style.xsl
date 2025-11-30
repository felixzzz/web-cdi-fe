<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <style type="text/css">
          body { font-family: sans-serif; background-color: #f9fafb; }
          a { text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="font-sans">
          <div class="bg-white overflow-hidden max-w-5xl">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h1 class="text-xl font-bold text-gray-800">XML Sitemap</h1>
              <a href="/" class="text-sm text-blue-600 hover:text-blue-800">← Back to Home</a>
            </div>

            <div class="p-0">
              <xsl:if test="sitemap:sitemapindex/sitemap:sitemap">
                <div class="bg-blue-50 px-6 py-3 border-b border-blue-100 text-sm text-blue-800">
                  This is a <strong>Sitemap Index</strong> containing <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm text-gray-600">
                    <thead class="bg-gray-50 uppercase font-medium border-b">
                      <tr>
                        <th class="px-6 py-3">Sitemap URL</th>
                        <th class="px-6 py-3 text-right">Last Modified</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                        <tr class="hover:bg-gray-50">
                          <td class="px-6 py-4">
                            <a href="{sitemap:loc}" class="text-blue-600 font-medium break-all">
                              <xsl:value-of select="sitemap:loc"/>
                            </a>
                          </td>
                          <td class="px-6 py-4 text-right whitespace-nowrap font-mono text-xs">
                            <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                          </td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </div>
              </xsl:if>

              <xsl:if test="sitemap:urlset/sitemap:url">
                <div class="bg-green-50 px-6 py-3 border-b border-green-100 text-sm text-green-800">
                  This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm text-gray-600">
                    <thead class="bg-gray-50 uppercase font-medium border-b">
                      <tr>
                        <th class="px-6 py-3">Location</th>
                        <th class="px-6 py-3 w-24">Priority</th>
                        <th class="px-6 py-3 w-24">Freq</th>
                        <th class="px-6 py-3 text-right w-32">Last Mod</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <xsl:for-each select="sitemap:urlset/sitemap:url">
                        <tr class="hover:bg-gray-50">
                          <td class="px-6 py-4">
                            <a href="{sitemap:loc}" target="_blank" class="text-gray-900 hover:text-blue-600 break-all block">
                              <xsl:value-of select="sitemap:loc"/>
                            </a>
                          </td>
                          <td class="px-6 py-4">
                            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              <xsl:value-of select="sitemap:priority"/>
                            </span>
                          </td>
                          <td class="px-6 py-4 capitalize text-xs">
                            <xsl:value-of select="sitemap:changefreq"/>
                          </td>
                          <td class="px-6 py-4 text-right whitespace-nowrap font-mono text-xs">
                            <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                          </td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </div>
              </xsl:if>
              
            </div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>