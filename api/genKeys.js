const crypto = require('crypto');
const fs = require('fs');

function genKeyPair() {
    if (!fs.existsSync(__dirname + '/id_rsa_pub.pem') || !fs.existsSync(__dirname + '/id_rsa_priv.pem')) {
        console.log("Generating Keypair...");
        const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096, // bits - standard for RSA keys
            publicKeyEncoding: {
                type: 'pkcs1', // "Public Key Cryptography Standards 1" 
                format: 'pem' // Most common formatting choice
            },
            privateKeyEncoding: {
                type: 'pkcs1', // "Public Key Cryptography Standards 1"
                format: 'pem' // Most common formatting choice
            }
        });
        
        // Create the public key file
        fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey); 
        
        // Create the private key file
        fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
        
        console.log("Generated Keypair");
    } else {
        console.log("Keypair found");
    }

}
genKeyPair();