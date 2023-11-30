var basePage = require('./baseclass');
var timeout = 120000;
var DetectLanguage = require('detectlanguage');

let base = new basePage();
let detectLang;

beforeAll(async () => {
    await base.build();
    await base.login();
    apiKey = await base.getApiKey();
    detectLang = new DetectLanguage(apiKey);
},timeout);

afterAll(async () => {
    await base.closeAll();  
},timeout);

describe('Single detection', () => {
  it('detects language', async () => {
    const result = await detectLang.detect('Welcome to sweden');
    expect(result[0].language).toEqual('en');
    expect(result[0].isReliable).toEqual(true);
    expect(result[0].confidence).toBeGreaterThanOrEqual(1);
  },timeout);

  it('Batch detection', async () => {
    const result = await detectLang.detect(['åland', 'Strč prst skrz krk']);
    expect(result[0][0].language).toEqual('sv');
    expect(result[1][0].language).toEqual('cs');
  });
},timeout);

describe('Language list', () => {
  it('fetches languages', async () => {
    const result = await detectLang.languages();
    expect(result[0].code).toBe('aa');
    expect(result[0].name).toBe('AFAR');
  },timeout);
});

describe('Account status', () => {
  it('fetches user status', async () => {
    const result = await detectLang.userStatus();
    expect(result.status).toBe('ACTIVE');
    expect(result.requests).toBeGreaterThanOrEqual(1);
  },timeout);
});
