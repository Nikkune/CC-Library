import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const baseDir = join(__dirname, "..", "build", "projects");

function walkDir(dir: string, callback: (file: string) => void) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			walkDir(fullPath, callback);
		} else if (entry.isFile() && entry.name.endsWith(".lua")) {
			callback(fullPath);
		}
	}
}

walkDir(baseDir, (file) => {
	let content = readFileSync(file, "utf8");
	// regex: remplace projects.<qqch>.APIs.<qqch>
	let newContent = content.replace(/projects\.[^.]+\.APIs\./g, "APIs.");
	// regex: remplace projects.<any path>.<module> par <module>
	// This matches any path under projects and keeps only the last segment
	newContent = newContent.replace(/projects\.[^.]+(?:\.[^.]+)*\.([^.]+)\./g, "$1.");
	if (newContent !== content) {
		writeFileSync(file, newContent, "utf8");
		console.log(`✔ Modifié: ${file}`);
	}
});
