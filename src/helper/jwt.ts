import jwt from 'jsonwebtoken';

export const generatedJWT = ( uid: string ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid
        }
    
        const secretKey: any = process.env.JWT_SECRET;
    
        jwt.sign( payload, secretKey, {
            expiresIn: '24h'
        }, (err, token) => {
    
            if( err ) {
                console.log(err);
                reject('JWT not generated');
            } else {
                resolve(token);
            }
    
        });
    });

}