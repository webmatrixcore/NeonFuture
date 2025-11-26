const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '../public/articles');
const OUTPUT_FILE = path.join(ARTICLES_DIR, 'index.json');

// Ensure directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
    console.error(`Error: Articles directory not found at ${ARTICLES_DIR}`);
    console.log("Please generate articles using services/geminiService.js first.");
    process.exit(1);
}

console.log("Scanning article files...");

// Filter for JSON files, excluding the index itself
const files = fs.readdirSync(ARTICLES_DIR).filter(file => file.endsWith('.json') && file !== 'index.json');
const index = [];

files.forEach(file => {
    try {
        const filePath = path.join(ARTICLES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const article = JSON.parse(content);
        
        // Push summary data to index
        index.push({
            id: article.id,
            title: article.title,
            category: article.category,
            excerpt: article.excerpt || article.subtitle || "",
            author: article.author,
            imageUrl: article.imageUrl || article.image || "",
            publishDate: article.publishDate
        });
    } catch (err) {
        console.error(`Error parsing ${file}:`, err.message);
    }
});

// Sort by date if available, otherwise random/stable
index.sort((a, b) => {
    if (a.publishDate && b.publishDate) {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
    return 0;
});

// Write index file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
console.log(`\nSUCCESS: Generated public/articles/index.json with ${index.length} articles.`);
