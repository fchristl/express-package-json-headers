import {Request, Response, NextFunction, RequestParamHandler, RequestHandler} from "express";
import * as fs from "fs";

export const addPackageJsonHeaders: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const metadata = await getMetaDataFromPackageJson();
    res.setHeader('X-Package-Version', metadata.version);
    res.setHeader('X-Package-Name', metadata.name);
    next();
};

async function getMetaDataFromPackageJson(): Promise<{version: string, name: string}> {
    const packageJsonContents = await getPackageJsonContents();
    return {
        version: packageJsonContents.version,
        name: packageJsonContents.name
    };
}

async function getPackageJsonContents(): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(getPackageJsonPath(), (error, buffer) => {
            if (error) {
                return reject(error);
            }
            try {
                const result = JSON.parse(buffer.toString());
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    });
}

function getPackageJsonPath(): string {
    return `${process.cwd()}/package.json`;
}