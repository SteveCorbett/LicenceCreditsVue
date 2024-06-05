// eslint-disable-next-line no-undef
import { readFileSync, writeFileSync } from "fs";

function getNameSansVersion(name) {
  const ix = name.lastIndexOf("@");
  return ix > 0 ? name.substring(0, ix) : name;
}

try {
  const rawProject = readFileSync("./package.json", "utf8");
  const project = JSON.parse(rawProject);
  const myName = project.name + "@" + project.version;
  const data = readFileSync("./src/assets/licences.json", "utf8");
  const rawLicences = JSON.parse(data);
  const outputFile = "./public/licences.json";

  const licences = [];
  for (const [key, value] of Object.entries(rawLicences)) {
    if (key === myName) {
      continue;
    }
    let packageLicence = "";
    const name = getNameSansVersion(key);

    if (value.licenseFile !== undefined) {
      const nameParts = value.licenseFile.split("/");
      if (
        nameParts.length > 1 &&
        nameParts[nameParts.length - 1].toUpperCase() != "README.MD"
      ) {
        try {
          packageLicence = readFileSync(value.licenseFile, "utf8");
        } catch (error) {
          // ignore, no licence details will be displayed
        }
      }
    }

    const licence = licences.find(
      (item) =>
        item.type === value.licenses &&
        item.publisher === value.publisher &&
        item.licence === packageLicence
    );
    if (licence) {
      licence.packages.push(name);
    } else {
      licences.push({
        packages: [name],
        type: value.licenses,
        publisher: value.publisher,
        licence: packageLicence,
      });
    }
  }
  const result = { licences: licences };
  writeFileSync(outputFile, JSON.stringify(result, null, " "), "utf8");
} catch (error) {
  console.log(error);
}
