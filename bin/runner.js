module.exports = (flags) => {
	// Imports.
	const getWorkspacesNx = require("../lib/getWorkspacesNx");
	const multiSemanticRelease = require("../lib/multiSemanticRelease");
	const multisemrelPkgJson = require("../package.json");
	const semrelPkgJson = require("semantic-release/package.json");

	// Get directory.
	const cwd = process.cwd();

	// Catch errors.
	try {
		console.log(`multi-semantic-release version: ${multisemrelPkgJson.version}`);
		console.log(`semantic-release version: ${semrelPkgJson.version}`);

		// Get list of package.json paths according to Yarn workspaces.
		const paths = getWorkspacesNx(cwd);
		console.log("yarn paths", paths);

		// Do multirelease (log out any errors).
		multiSemanticRelease(paths, {}, { cwd }).then(
			() => {
				// Success.
				process.exit(0);
			},
			(error) => {
				// Log out errors.
				console.error(`[multi-semantic-release]:`, error);
				process.exit(1);
			}
		);
	} catch (error) {
		// Log out errors.
		console.error(`[multi-semantic-release]:`, error);
		process.exit(1);
	}
};
