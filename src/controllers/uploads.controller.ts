import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';


export const putUploads = async ( req: Request, res: Response ) => {

    const table: string = req.params.table;
    const id: string = req.params.id;

    const validTables: string[] = ['users', 'hospitals', 'doctors'];
    
    if( !validTables.includes( table ) ) {
        res.status(400).json({
            ok: false,
            msg: 'Table selected is not valid'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).json({
            ok: false,
            msg: 'File is empty'
        });

    }

    const file: any = req.files.image;

    const cutNameFile: any[] = file.name.split('.');
    const extensionFile: string = cutNameFile[ cutNameFile.length -1 ];

    const validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'];

    if( !validExtensions.includes( extensionFile ) ) {

        res.status(400).json({
            ok: false,
            msg: 'Extension must be png, jpg, jpeg or gif'
        });

    }


    const nameFile = `${ uuidv4() }.${ extensionFile }`;

    const path: string = `./src/uploads/${table}/${nameFile}`;
    console.log(path);
    

    file.mv( path, (err: any) => {
        if (err) {
            console.log(err);
        
            return res.status(500).json({
                ok: false,
                msg: 'Error to load image'
          });
        }
    
        res.json({
            ok: true,
            msg: 'File uploaded',
            nameFile
        });
    });


}