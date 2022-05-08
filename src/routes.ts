import { Express, Request, Response } from 'express';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.status(200));
    
    app.post("/api/users", validate(createUserSchema), createUserHandler);

    app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler);

    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    app.delete("/api/sessions", requireUser, deleteSessionHandler);

//products
    app.post("/api/products", [requireUser, validate(createProductSchema)],
        createProductHandler
    );

    app.put("/api/products/:productId", [requireUser, validate(updateProductSchema)],
    updateProductHandler
    );
    
    app.get("/api/products/:productId", [ validate(getProductSchema)],
    getProductHandler
    );
    
    app.delete("/api/products/:productId", [requireUser,validate(deleteProductSchema)],
    deleteProductHandler
);

}

export default routes;