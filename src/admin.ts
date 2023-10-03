import User from "./models/User.model.js";
import Product from "./models/Product.model.js";
import { AdminJS } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";


AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});


export const adminJS = new AdminJS(
  {
    defaultTheme: light.id,
    availableThemes: [
      dark,
      light,
      noSidebar,
    ],
    resources: [
      {
        resource: User,
        options: {
          properties: { password: { isVisible: false } },
          listProperties: [
            "_id",
            "email",
            "isDeleted",
          ],
        },
      }, { resource: Product },
    ],
  },
);

const adminRouter = AdminJSExpress.buildRouter(adminJS);

export default adminRouter;
