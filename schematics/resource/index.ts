import {
  Rule,
  Tree,
  SchematicContext,
  apply,
  url,
  template,
  move,
  mergeWith,
} from "@angular-devkit/schematics";

import { strings } from "@angular-devkit/core";
import * as path from "path";

interface Options {
  name: string;
  fields?: string;
}

export function resourceGenerator(options: Options): Rule {

  return (_tree: Tree, _context: SchematicContext) => {

    const parsed = path.parse(options.name);

    const resourceName = parsed.name;   // categories
    const resourcePath = parsed.dir;    // modules/admin

    const targetPath = `src/${resourcePath}/${resourceName}`;

    // Convert fields
    const fields = options.fields
    ? options.fields.split(",").map(f => f.trim())
    : [];

    const timestamp = new Date().getTime();

    const sourceTemplates = apply(url("./files"), [
      template({
        ...strings,
        name: resourceName,
        fields,
        timestamp,
      }),
      move(targetPath),
    ]);

    return mergeWith(sourceTemplates);
  };
}