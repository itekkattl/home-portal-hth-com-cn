// assets/content-map.js
// Simple content map for site sections, keyword tags, and search filtering

const siteContent = [
  {
    section: "home",
    title: "首页",
    url: "https://home-portal-hth.com.cn",
    tags: ["华体会", "首页", "门户"],
    keywords: ["华体会", "首页", "平台概述"]
  },
  {
    section: "news",
    title: "新闻动态",
    url: "https://home-portal-hth.com.cn/news",
    tags: ["华体会", "新闻", "动态"],
    keywords: ["华体会", "新闻", "更新", "资讯"]
  },
  {
    section: "products",
    title: "产品中心",
    url: "https://home-portal-hth.com.cn/products",
    tags: ["华体会", "产品", "服务"],
    keywords: ["华体会", "产品列表", "功能", "介绍"]
  },
  {
    section: "about",
    title: "关于华体会",
    url: "https://home-portal-hth.com.cn/about",
    tags: ["华体会", "关于", "简介"],
    keywords: ["华体会", "公司", "团队", "使命"]
  },
  {
    section: "contact",
    title: "联系方式",
    url: "https://home-portal-hth.com.cn/contact",
    tags: ["华体会", "联系", "支持"],
    keywords: ["华体会", "邮箱", "电话", "地址"]
  }
];

const siteTags = [
  "华体会",
  "首页",
  "新闻",
  "产品",
  "关于",
  "联系",
  "服务",
  "功能",
  "更新"
];

function searchContent(query, contentList) {
  if (!query || query.trim() === "") {
    return contentList.slice();
  }
  const lowerQuery = query.toLowerCase();
  return contentList.filter(item => {
    const combined = [
      item.title,
      ...item.tags,
      ...item.keywords
    ].join(" ").toLowerCase();
    return combined.includes(lowerQuery);
  });
}

function filterByTag(tag, contentList) {
  if (!tag || tag.trim() === "") {
    return [];
  }
  const lowerTag = tag.toLowerCase();
  return contentList.filter(item =>
    item.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

function getAllUniqueTags(contentList) {
  const tagSet = new Set();
  contentList.forEach(item => {
    item.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

function generateSitemap(contentList, baseUrl) {
  return contentList.map(item => ({
    loc: item.url,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: item.section === "home" ? "1.0" : "0.8"
  }));
}

function getSectionByUrl(url, contentList) {
  return contentList.find(item => item.url === url) || null;
}

function addContentEntry(section, title, url, tags, keywords, contentList) {
  const newEntry = {
    section: section,
    title: title,
    url: url,
    tags: tags,
    keywords: keywords
  };
  contentList.push(newEntry);
  return newEntry;
}

function removeContentEntryByUrl(url, contentList) {
  const index = contentList.findIndex(item => item.url === url);
  if (index !== -1) {
    return contentList.splice(index, 1)[0];
  }
  return null;
}

function keywordMatchCount(query, entry) {
  const lowerQuery = query.toLowerCase();
  let count = 0;
  entry.keywords.forEach(kw => {
    if (kw.toLowerCase().includes(lowerQuery)) {
      count++;
    }
  });
  return count;
}

function rankSearchResults(query, contentList) {
  const results = searchContent(query, contentList);
  results.sort((a, b) => {
    return keywordMatchCount(query, b) - keywordMatchCount(query, a);
  });
  return results;
}

// Example usage (uncomment to test in Node.js or browser console):
// console.log(searchContent("华体会", siteContent));
// console.log(filterByTag("新闻", siteContent));
// console.log(getAllUniqueTags(siteContent));
// console.log(generateSitemap(siteContent, "https://home-portal-hth.com.cn"));
// console.log(getSectionByUrl("https://home-portal-hth.com.cn/about", siteContent));
// console.log(rankSearchResults("服务", siteContent));