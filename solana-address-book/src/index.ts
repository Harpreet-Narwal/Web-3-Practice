/* import express from "express";
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

const app = express();
app.use(express.json());


interface Contact{
  id: number;
  name: string;
  address: string;
  type: 'wallet' | 'pda';
  createdAt: string;
  
}


let contacts:Contact[] = [];
let nextId = 1;

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')


const isValidPublicKey = (key: string): boolean =>{
  try{
    new PublicKey(key);
    return true;
  }
  catch{
    return false;
  }
}


// TODO: POST /api/contacts — Add a contact (validate address, auto-detect wallet vs PDA)
// TODO: GET /api/contacts — List contacts (?type=wallet|pda)
// TODO: GET /api/contacts/:id — Get contact by ID
// TODO: PUT /api/contacts/:id — Update contact name
// TODO: DELETE /api/contacts/:id — Delete contact
// TODO: POST /api/contacts/:id/derive-ata — Derive Associated Token Account
// TODO: POST /api/verify-ownership — Verify ed25519 signature
// TODO: POST /api/derive-pda — Derive PDA from programId + seeds

app.post("/api/contacts", (req ,res) =>{
  const name = req.body.name;
  const address = req.body.address;

  if(!name || typeof name !== 'string' || !address || typeof address !== 'string'){
    return res.status(400).json({error: 'Missing or invalid field'})
  }
  if(!isValidPublicKey(address)){
    return res.status(400).json({error: "Invalid Solana address"});
  }

  if(contacts.some(c => c.address === address)){
    return res.status(409).json({error: 'Address already exists'})
  }

  const pubKey = new PublicKey(address);
  const isWallet = PublicKey.isOnCurve(pubKey.toBytes());
  const type = isWallet ? 'wallet' : 'pda';

  const newContact: Contact = {
    id: nextId++,
    name: name,
    address,
    type,
    createdAt: new Date().toISOString()
  }

  contacts.push(newContact);
  res.status(200).json(newContact);
})

app.get("/api/contacts", (req, res) =>{
  const type = req.query.type as string;
  let result = contacts;

  if(type === 'wallet' || type === 'pda'){
    result = contacts.filter(c => c.type === type);
  }

  res.status(200).json(result);
})


app.get("/api/contacts/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const contact = contacts.find(c => c.id === id);

  if(!contact){
    res.status(404).json({error: "Contact not found"});
  }

  return res.status(200).json({contact});

})


app.put("/api/contacts/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const name = req.body.name;
  if(!name ){
    return res.status(400).json({error: "missing name"})
  }
  const contactIndex = contacts.findIndex(c => c.id === id);

  if(contactIndex === -1){
    return res.status(404).json({error: "Contact not found"});
  }

  contacts[contactIndex].name = name;
  return res.status(200)

})


app.delete("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contactInd = contacts.findIndex(c => c.id === id);

  if(!contactInd){
    return res.status(404).json({error: "Not found"});
  }

  contacts.splice(contactInd, 1);
  return res.status(200).json({message: "Contact deleted"})
})


app.post("/api/contacts/:id/derive-ata", (req, res) =>{
  const id = parseInt(req.params.id);
  const { mintAddress } = req.body;

  const contact = contacts.find(c => c.id === id);

  if(!contact){
    return res.status(404).json({error: "Contact not found"});
  }

  if(!mintAddress || typeof mintAddress !== 'string' || isValidPublicKey(mintAddress)){
    return res.status(400).json({error: 'Invalid mint address'});
  }

  try{

    const ownerPubKey = new PublicKey(contact.address);
    const mintPubKey = new PublicKey(mintAddress);

    const [ata] = PublicKey.findProgramAddressSync(
      [ownerPubKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mintPubKey.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    res.status(200).json({
      ata: ata.toBase58(),
      owner: contact.address,
      mint: mintAddress
    });
  }catch(e){
    res.status(400).json({error: "Failed to derive ATA"});
  }

})


app.post("/api/verify-ownership", (req, res) =>{
  const { address, message, signature } = req.body;
  if(!address || !message || !signature)  {
    return res.status(400).json({error:"missing fields or invalid inputs"});
  }

  try{
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signature);
    const publicKeyBytes = bs58.decode(address);

    const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
    res.status(200).json({valid: isValid});
  }catch(e){
    res.status(400).json({error: "missing fields or invalid inputs"})
  }
})


app.post("/api/derive-pda", (req, res) =>{
  const { programId, seeds } = req.body;

  if(!programId || isValidPublicKey(programId)){
    return res.status(400).json({error: "Invalid programId"});
  }

  if(!Array.isArray(seeds)){
    return res.status(400).json({error: 'Seeds must be provided'})
  }

  const seedBuffers: Buffer[] = [];
  for(const seed of seeds){
    if(typeof seed !== 'string'){
      return res.status(400).json({error: 'All seeds must be string'})
    }
    const buffer = Buffer.from(seed, 'utf8');
    if(buffer.length > 32){
      return res.status(400).json({error: "A seed exceeded the 32-byte limit"});
    }

    seedBuffers.push(buffer);


    try{
      const programPubKey = new PublicKey(programId);
      const [pda, bump] = PublicKey.findProgramAddressSync(seedBuffers, programPubKey);

      res.status(200).json({
        pda: pda.toBase58(),
        bump
      })
    }catch(err){
      return res.status(400).json({error: 'Failed to derive PDA'})
    }
  }

})


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
 */




import express, { Request, Response } from 'express';
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// TODO: POST /api/registry/register — Register a top-level name (derive PDA from seeds)
// TODO: GET /api/registry/resolve/:programId/:name — Resolve name to PDA
// TODO: POST /api/registry/sub/register — Register a sub-name under a parent
// TODO: GET /api/registry/sub/resolve/:programId/:parentName/:subName — Resolve sub-name
// TODO: POST /api/registry/transfer — Transfer ownership (verify ed25519 signature)
// TODO: POST /api/registry/verify — Verify PDA derivation
// TODO: GET /api/registry/list/:programId — List names (?owner= filter)
// TODO: GET /api/registry/list/:programId/:name/subs — List sub-names



interface Registration {
    id: string;
    name: string;
    programId: string;
    pda: string;
    owner: string;
    bump: number;
    createdAt: string;
    parentName: string | null;
    parentPda: string | null;
}

const registry: Registration[] = [];


const isValidPublicKey = (key: string): boolean => {
    try {
        new PublicKey(key);
        return true;
    } catch {
        return false;
    }
};


app.post('/api/registry/register', (req: Request, res: Response) => {
    const { name, programId, owner } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: "Missing or empty name" });
    }
    if (!programId || !owner || !isValidPublicKey(programId) || !isValidPublicKey(owner)) {
        return res.status(400).json({ error: "Missing fields or invalid programId/owner keys" });
    }

    const existing = registry.find(r => r.programId === programId && r.name === name && r.parentPda === null);
    if (existing) {
        return res.status(409).json({ error: "Name already registered for this programId" });
    }

    try {
        const [pda, bump] = PublicKey.findProgramAddressSync(
            [Buffer.from("name"), Buffer.from(name)],
            new PublicKey(programId)
        );

        const reg: Registration = {
            id: crypto.randomUUID(),
            name,
            programId,
            pda: pda.toBase58(),
            owner,
            bump,
            createdAt: new Date().toISOString(),
            parentName: null,
            parentPda: null
        };

        registry.push(reg);
        return res.status(201).json(reg);
    } catch (error) {
        return res.status(400).json({ error: "Failed to derive PDA" });
    }
});


app.get('/api/registry/resolve/:programId/:name', (req: Request, res: Response) => {
    const { programId, name } = req.params;
    const reg = registry.find(r => r.programId === programId && r.name === name && r.parentPda === null);
    
    if (!reg) {
        return res.status(404).json({ error: "Name not found" });
    }
    return res.status(200).json(reg);
});


app.post('/api/registry/sub/register', (req: Request, res: Response) => {
    const { parentName, subName, programId, owner } = req.body;

    if (!parentName || !subName || typeof subName !== 'string' || subName.trim() === '') {
        return res.status(400).json({ error: "Missing fields or empty subName" });
    }
    if (!programId || !owner || !isValidPublicKey(programId) || !isValidPublicKey(owner)) {
        return res.status(400).json({ error: "Invalid programId or owner inputs" });
    }

    const parentReg = registry.find(r => r.programId === programId && r.name === parentName && r.parentPda === null);
    if (!parentReg) {
        return res.status(404).json({ error: "Parent name not found" });
    }

    const existingSub = registry.find(r => r.programId === programId && r.parentName === parentName && r.name === subName);
    if (existingSub) {
        return res.status(409).json({ error: "Sub-name already exists under this parent" });
    }

    try {
        const parentPdaKey = new PublicKey(parentReg.pda);
        const [pda, bump] = PublicKey.findProgramAddressSync(
            [Buffer.from("sub"), parentPdaKey.toBuffer(), Buffer.from(subName)],
            new PublicKey(programId)
        );

        const reg: Registration = {
            id: crypto.randomUUID(),
            name: subName,
            parentName,
            parentPda: parentReg.pda,
            programId,
            pda: pda.toBase58(),
            owner,
            bump,
            createdAt: new Date().toISOString()
        };

        registry.push(reg);
        return res.status(201).json(reg);
    } catch (error) {
        return res.status(400).json({ error: "Failed to derive sub-name PDA" });
    }
});


app.get('/api/registry/sub/resolve/:programId/:parentName/:subName', (req: Request, res: Response) => {
    const { programId, parentName, subName } = req.params;
    const reg = registry.find(r => 
        r.programId === programId && 
        r.parentName === parentName && 
        r.name === subName
    );

    if (!reg) {
        return res.status(404).json({ error: "Sub-name not found" });
    }
    return res.status(200).json(reg);
});


app.post('/api/registry/transfer', (req: Request, res: Response) => {
    const { programId, name, newOwner, signature, message } = req.body;

    if (!programId || !name || !newOwner || !signature || !message) {
        return res.status(400).json({ error: "Missing fields" });
    }
    if (!isValidPublicKey(programId) || !isValidPublicKey(newOwner)) {
        return res.status(400).json({ error: "Invalid programId or newOwner" });
    }
    

    if (message !== `transfer:${name}:to:${newOwner}`) {
        return res.status(400).json({ error: "Message doesn't match expected format" });
    }

    const regIndex = registry.findIndex(r => r.programId === programId && r.name === name && r.parentPda === null);
    if (regIndex === -1) {
        return res.status(404).json({ error: "Name not found" });
    }

    const reg = registry[regIndex];

    try {
        const msgBytes = Buffer.from(message, 'utf-8');
        const sigBytes = bs58.decode(signature);
        const pubKeyBytes = bs58.decode(reg.owner);


        const isValid = nacl.sign.detached.verify(msgBytes, sigBytes, pubKeyBytes);
        if (!isValid) {
            return res.status(403).json({ error: "Invalid signature" });
        }
    } catch (error) {
        return res.status(403).json({ error: "Invalid signature format or keys" });
    }

    registry[regIndex].owner = newOwner;
    return res.status(200).json(registry[regIndex]);
});


app.post('/api/registry/verify', (req: Request, res: Response) => {
    const { address, programId, seeds } = req.body;

    if (!address || !programId || !seeds || !Array.isArray(seeds)) {
        return res.status(400).json({ error: "Missing fields or invalid payload" });
    }
    if (!isValidPublicKey(address) || !isValidPublicKey(programId)) {
        return res.status(400).json({ error: "Invalid address or programId" });
    }

    try {
        const seedBuffers = seeds.map(s => Buffer.from(s, 'utf-8'));
        const [pda, bump] = PublicKey.findProgramAddressSync(seedBuffers, new PublicKey(programId));
        
        return res.status(200).json({
            valid: pda.toBase58() === address,
            expectedPda: pda.toBase58(),
            bump
        });
    } catch (error) {
        return res.status(400).json({ error: "Invalid seeds or derivation failed" });
    }
});


app.get('/api/registry/list/:programId', (req: Request, res: Response) => {
    const { programId } = req.params;
    const { owner } = req.query;

    let results = registry.filter(r => r.programId === programId && r.parentPda === null);

    if (owner && typeof owner === 'string') {
        results = results.filter(r => r.owner === owner);
    }

    return res.status(200).json(results);
});


app.get('/api/registry/list/:programId/:name/subs', (req: Request, res: Response) => {
    const { programId, name } = req.params;

    const parentReg = registry.find(r => r.programId === programId && r.name === name && r.parentPda === null);
    if (!parentReg) {
        return res.status(404).json({ error: "Parent name not found" });
    }

    const subs = registry.filter(r => r.programId === programId && r.parentName === name);
    return res.status(200).json(subs);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});