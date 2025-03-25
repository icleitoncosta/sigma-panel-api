import express, { Router } from "express";
import { loginAndGenerateData } from "../loginAndGenerateData";
import process from 'process';
import { validateBearerToken } from "../utils/validateBearerToken";

const routes: Router = Router();

routes.post("/novo-teste", validateBearerToken, async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        if(!req?.body?.username || !req?.body?.password) {
            return res.status(400).send('username and password are required');
        }
        if((!req?.body?.server_id && !process.env.DEFAULT_SERVER_ID || (!req?.body?.package_id && !process.env.DEFAULT_PACKAGE_ID ) || (!req?.body?.trial_hours && !process.env.DEFAULT_TRIAL_HOURS))) {
            return res.status(400).send('Please, configure default values in environment variables or send server_id, package_id and trial_hours in request body');
        }
        const { page, browser } = await loginAndGenerateData(process.env.LOGIN_SERVER as string, process.env.PASSWORD_SERVER as string);

        await page.route(/\/api\/customers.*/, async (route, request) => {
            const postData = JSON.parse(request.postData() || '{}');
            
            postData.server_id = req?.body?.server_id || process.env.DEFAULT_SERVER_ID;
            postData.package_id = req?.body?.package_id || process.env.DEFAULT_PACKAGE_ID;
            postData.trial_hours = req?.body?.trial_hours || process.env.DEFAULT_TRIAL_HOURS;
            postData.username = req?.body?.username;
            postData.password = req?.body?.password;
            postData.email = req?.body?.email || null;
            postData.whatsapp = req?.body?.whatsapp || null;
            postData.telegram = req?.body?.telegram || null;
            postData.name = req?.body?.name || null;
            postData.plan_price = req?.body?.plan_price || null; // passe com a string R$ 25,00 para 25.00
        
            await route.continue({
                method: 'POST',
                headers: request.headers(),
                postData: JSON.stringify(postData)
            });
        });
        const responsePromise = page.waitForResponse(response => 
            response.url().includes('/api/customers') && response.request().method() === 'POST'
        );

        await page.waitForTimeout(1000 + Math.random() * 2000); 
        await page.mouse.move(400, 400, { steps: 50 });
        await page.hover('.card-body .btn');
        await page.click('.card-body .btn');

        const response = await responsePromise;
        const responseData = await response.json(); 

        browser.close();
        return res.status(200).send(responseData);

    } catch (error: any) {
        console.error(error);
        return res.status(500).send(error?.toString());
    }
});

export default routes;