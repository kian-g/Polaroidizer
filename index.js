const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
const gm = require("gm").subClass({ imageMagick: true });

const app = express();
app.use(express.static(__dirname + "/public"));
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${file.originalname}`);
	},
});
app.use(multer({ storage }).array("photos"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/upload", (req, res) => {
	const modifiedPhotos = [];
	req.files.forEach((photo) => {
		// Read the width and height of the input photo
		gm(photo.path).size((err, size) => {
			if (err) {
				console.error(err);
				return res.send(err);
			}
			// Calculate the border width and height
			const border = 0.05 * size.width;

			const finalWidth = 1200;
			const finalHeight = 1200;

			// Read the photo and add a white border and a rectangle on the bottom
			const filename = `${photo.filename}-modified.${
				photo.mimetype.split("/")[1]
			}`;
			gm(photo.path)
				.borderColor("white")
				.border(border, border, border, border)
				.resize(finalWidth, finalHeight)
				.write(
					path.join(
						__dirname,
						"public",
						"uploads/new",
						filename
					),
					(error) => {
						if (error) {
							console.error(error);
						}
						// Add the modified photo filename to the array
						modifiedPhotos.push(filename);
						// Delete the original file
						fs.unlink(photo.path, (err) => {
							if (err) {
								console.error(err);
							}
							// If all photos have been processed, render the results template
							if (modifiedPhotos.length === req.files.length) {
								res.render("results", {
									photos: modifiedPhotos,
								});
							}
						});
					}
				);
		});
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
