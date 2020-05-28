import { DefaultNamingStrategy } from "typeorm";
import { snakeCase, startCase } from "lodash";

export class RailsNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName?: string) {
    return userSpecifiedName || snakeCase(targetName) + "s";
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ) {
    if (embeddedPrefixes.length) {
      return (
        snakeCase(embeddedPrefixes.join("_")) +
        (customName ? startCase(customName) : startCase(propertyName))
      );
    }

    // TODO: Introduce a customizable way to support names like `fooURLs`.
    return customName || snakeCase(propertyName).replace(/_ur_ls$/, "_urls");
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(relationName + "_" + referencedColumnName);
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string
  ) {
    return snakeCase(tableName + "_" + (columnName || propertyName));
  }
}

export default RailsNamingStrategy;
