export async function validateCredentials(username, password) {

    /* 
    format: username, salt, hashed password + salt
    credentials: user user, admin admin, tom password123, levi password123 (regular acc)
    hardcoded for production convenience, will later on be checked against database data instead of hardcoded values
    */
    let accounts = [
        ["user", "6734300e0cd5a67747aa31a997e267ec", "$argon2id$v=19$m=16,t=3,p=2$NjczNDMwMGUwY2Q1YTY3NzQ3YWEzMWE5OTdlMjY3ZWM$TC3qZ9KVE5CqxS4yjplw70PrnS59sq8GY+LYdW/M0hM", "user"],
        ["admin", "feb9fd08a5a26394f5ddb66897a660a6", "$argon2id$v=19$m=16,t=3,p=2$ZmViOWZkMDhhNWEyNjM5NGY1ZGRiNjY4OTdhNjYwYTY$V5Yi37sMYYzodZVbvLWpjppJhsP6GLXgJRwdwnYNcu0", "admin"],
        ["tom", "e05ba3ad2b8c0570ab80faec5b679683", "$argon2id$v=19$m=16,t=3,p=2$ZTA1YmEzYWQyYjhjMDU3MGFiODBmYWVjNWI2Nzk2ODM$+KYFi13Pv/GfV/sRwYQcbvdj819XTBfo+cRYlIg8p7E", "password123"],
        ["levi", "b56efdb7d327ff80ec96ddce7f5aefea", "$argon2id$v=19$m=16,t=3,p=2$YjU2ZWZkYjdkMzI3ZmY4MGVjOTZkZGNlN2Y1YWVmZWE$Oa+e3MnrJzar728WW6reDQaKtz17gGUWEdYcQ6nuNSg", "password123"]
    ] // note: hashing does NOT work yet so i added unhashed passwords at the end with i = 3

    function hexToUint8Array(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }
        return bytes;
    }    

    async function hashString(password, saltHex) {
        const params = {
            pass: password,
            salt: hexToUint8Array(saltHex),
            type: argon2.ArgonType.Argon2id,
            parallelism: 2,
            memory: 16,
            iterations: 3,
            hashLen: 32,
        };

        const hash = await argon2.hash(params);
        return hash.encoded;
    }

    for (let [storedUsername, storedSaltHex, storedHash, storedPass] of accounts){
        let hashedPass;

        /*
        try{
            hashedPass = await hashString(password, storedSaltHex)
        } catch (error) {
            console.error("Error occurred during hashing: " + error)
            return { success: false, message: "Couldn't hash password" };
        }
        */

        if (username == storedUsername && password == storedPass){
            return { success: true, message: "Credentials are valid" };
        }
    }
    return { success: false, message: "Couldn't find matching credentials in our system" };
}

export function test(){
    return "works";
}