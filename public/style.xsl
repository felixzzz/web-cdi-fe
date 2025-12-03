<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          body {
            font-family: Inter, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #333;
            background-color: #fff; 
            margin: 0; 
            padding: 2rem; 
          }

          p.expl {
            margin-bottom: 1rem;
            color: #555;
          }
          
          p.expl a {
             color: #398465; /* Warna hijau sesuai referensi */
             font-weight: 600;
             text-decoration: none;
          }

          table {
            border: none;
            border-collapse: collapse;
          }

          th {
            text-align: left;
            padding-right: 30px;
            font-size: 12px;
          }

          thead th {
            border-bottom: 1px solid #000;
          }

          td {
            font-size: 12px;
          }
          
          /* Warna baris selang-seling yang lebih halus */
          #sitemap tr:nth-child(odd) td {
            background-color: #fcfcfc !important; 
          }

          /* Efek hover */
          #sitemap tbody tr:hover td {
            background-color: #f0f0f0 !important; 
          }

          a {
            color: #333; /* Warna link default */
            text-decoration: none;
            transition: color 0.2s; /* Transisi warna */
          }

          a:hover {
            color: #398465; /* Warna hijau saat hover */
            text-decoration: underline;
          }
          
          /* Pengaturan lebar kolom agar proporsional */
          .col-url { width: 60%; }
          .col-images { width: 15%; text-align: center;} /* Tengah untuk angka */
          .col-lastmod { width: 25%; text-align: right;} /* Kanan untuk tanggal */
          
           /* Penyesuaian untuk tabel index (tanpa kolom images) */
          .col-index-url { width: 75%; }
          .col-index-lastmod { width: 25%; text-align: right; }


        </style>
      </head>
      <body style="grid-template-columns: 1fr 1fr; display: grid;">
        <div id="content">
          <h1 class="text-2xl mb-3">XML Sitemap</h1>
          <h2 class="text-2xl mb-3">chandra_shipping_international</h2>

          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <p class="expl">
              This XML Sitemap Index file contains
              <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
            </p>
            <table id="sitemap">
              <thead>
                <tr>
                  <th class="col-index-url">Sitemap</th>
                  <th class="col-index-lastmod">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <xsl:variable name="sitemapURL">
                    <xsl:value-of select="sitemap:loc"/>
                  </xsl:variable>
                  <tr>
                    <td>
                      <a href="{$sitemapURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td style="text-align: right;"> <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>

          <xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
            <p class="expl">
              This XML Sitemap contains
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
            </p>
            <table id="sitemap">
              <thead>
                <tr>
                  <th class="col-url">URL</th>
                  <th class="col-images">Images</th>
                  <th class="col-lastmod">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td style="text-align: center;"> <xsl:value-of select="count(image:image)"/>
                    </td>
                    <td style="text-align: right;"> <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>