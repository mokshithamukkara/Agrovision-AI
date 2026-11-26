
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Sprout, Upload, MapPin, CloudSun, ScanSearch,
  MessageCircle, Leaf, Languages, AlertTriangle, LoaderCircle
} from 'lucide-react';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001';

const langs = [
  'English', 'हिन्दी', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ',
  'മലയാളം', 'मराठी', 'ગુજરાતી', 'বাংলা', 'ਪੰਜਾਬੀ', 'ଓଡ଼ିଆ'
];

// Each row contains translations in the same order as the language list above.
const words = {
  About: ['About','परिचय','గురించి','பற்றி','ಬಗ್ಗೆ','കുറിച്ച്','माहिती','વિશે','সম্পর্কে','ਬਾਰੇ','ବିଷୟରେ'],
  Features: ['Features','विशेषताएँ','ఫీచర్లు','அம்சங்கள்','ವೈಶಿಷ್ಟ್ಯಗಳು','സവിശേഷതകൾ','वैशिष्ट्ये','વિશેષતાઓ','বৈশিষ্ট্য','ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ','ବିଶେଷତା'],
  'Crop Scanner': ['Crop Scanner','फसल स्कैनर','పంట స్కానర్','பயிர் ஸ்கேனர்','ಬೆಳೆ ಸ್ಕ್ಯಾನರ್','വിള സ്കാനർ','पीक स्कॅनर','પાક સ્કેનર','ফসল স্ক্যানার','ਫਸਲ ਸਕੈਨਰ','ଫସଲ ସ୍କାନର'],
  Weather: ['Weather','मौसम','వాతావరణం','வானிலை','ಹವಾಮಾನ','കാലാവസ്ഥ','हवामान','હવામાન','আবহাওয়া','ਮੌਸਮ','ପାଣିପାଗ'],
  'AI Assistant': ['AI Assistant','AI सहायक','AI సహాయకుడు','AI உதவியாளர்','AI ಸಹಾಯಕ','AI അസിസ്റ്റന്റ്','AI सहाय्यक','AI સહાયક','AI সহকারী','AI ਸਹਾਇਕ','AI ସହାୟକ'],
  'INTELLIGENCE FOR EVERY FIELD': ['INTELLIGENCE FOR EVERY FIELD','हर खेत के लिए बुद्धिमत्ता','ప్రతి పొలానికి సాంకేతిక తెలివి','ஒவ்வொரு வயலுக்கும் நுண்ணறிவு','ಪ್ರತಿ ಹೊಲಕ್ಕೂ ಬುದ್ಧಿವಂತಿಕೆ','ഓരോ കൃഷിയിടത്തിനും സാങ്കേതിക സഹായം','प्रत्येक शेतासाठी बुद्धिमत्ता','દરેક ખેતર માટે બુદ્ધિમત્તા','প্রতিটি ক্ষেতের জন্য বুদ্ধিমত্তা','ਹਰ ਖੇਤ ਲਈ ਸਮਝਦਾਰੀ','ପ୍ରତ୍ୟେକ କ୍ଷେତ ପାଇଁ ବୁଦ୍ଧିମତ୍ତା'],
  'Grow smarter.': ['Grow smarter.','समझदारी से उगाएँ।','తెలివిగా పండించండి.','அறிவார்ந்த முறையில் வளருங்கள்.','ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಬೆಳೆಸಿ.','ബുദ്ധിപൂർവ്വം കൃഷി ചെയ്യൂ.','अधिक हुशारीने पिकवा.','સમજદારીથી ઉગાડો.','বুদ্ধিমত্তার সঙ্গে চাষ করুন।','ਸਮਝਦਾਰੀ ਨਾਲ ਉਗਾਓ।','ବୁଦ୍ଧିମତାର ସହିତ ଚାଷ କରନ୍ତୁ।'],
  'Farm better.': ['Farm better.','बेहतर खेती करें।','మెరుగైన వ్యవసాయం చేయండి.','சிறந்த விவசாயம் செய்யுங்கள்.','ಉತ್ತಮ ಕೃಷಿ ಮಾಡಿ.','മികച്ച കൃഷി ചെയ്യൂ.','चांगली शेती करा.','વધુ સારી ખેતી કરો.','আরও ভালো চাষ করুন।','ਬਿਹਤਰ ਖੇਤੀ ਕਰੋ।','ଭଲ ଚାଷ କରନ୍ତୁ।'],
  'AI-powered crop insights, local weather intelligence and practical farming guidance — in your language.': [
    'AI-powered crop insights, local weather intelligence and practical farming guidance — in your language.',
    'AI आधारित फसल जानकारी, स्थानीय मौसम और खेती की सलाह — आपकी भाषा में।',
    'AI ఆధారిత పంట సమాచారం, స్థానిక వాతావరణ వివరాలు మరియు వ్యవసాయ సూచనలు — మీ భాషలో.',
    'AI பயிர் தகவல்கள், உள்ளூர் வானிலை மற்றும் விவசாய வழிகாட்டுதல் — உங்கள் மொழியில்.',
    'AI ಬೆಳೆ ಮಾಹಿತಿ, ಸ್ಥಳೀಯ ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ — ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.',
    'AI വിള വിവരങ്ങൾ, പ്രാദേശിക കാലാവസ്ഥ, കൃഷി മാർഗനിർദേശം — നിങ്ങളുടെ ഭാഷയിൽ.',
    'AI आधारित पीक माहिती, स्थानिक हवामान आणि शेती मार्गदर्शन — तुमच्या भाषेत.',
    'AI આધારિત પાક માહિતી, સ્થાનિક હવામાન અને ખેતી માર્ગદર્શન — તમારી ભાષામાં.',
    'AI-ভিত্তিক ফসলের তথ্য, স্থানীয় আবহাওয়া ও কৃষি পরামর্শ — আপনার ভাষায়।',
    'AI ਫਸਲ ਜਾਣਕਾਰੀ, ਸਥਾਨਕ ਮੌਸਮ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਲਾਹ — ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ।',
    'AI ଆଧାରିତ ଫସଲ ସୂଚନା, ସ୍ଥାନୀୟ ପାଣିପାଗ ଓ ଚାଷ ପରାମର୍ଶ — ଆପଣଙ୍କ ଭାଷାରେ।'
  ],
  'Analyze my crop': ['Analyze my crop','मेरी फसल का विश्लेषण करें','నా పంటను విశ్లేషించండి','என் பயிரை ஆய்வு செய்','ನನ್ನ ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ','എന്റെ വിള പരിശോധിക്കുക','माझ्या पिकाचे विश्लेषण करा','મારા પાકનું વિશ્લેષણ કરો','আমার ফসল বিশ্লেষণ করুন','ਮੇਰੀ ਫਸਲ ਦੀ ਜਾਂਚ ਕਰੋ','ମୋ ଫସଲ ବିଶ୍ଳେଷଣ କରନ୍ତୁ'],
  'Explore dashboard': ['Explore dashboard','डैशबोर्ड देखें','డ్యాష్‌బోర్డ్ చూడండి','டாஷ்போர்டைப் பார்க்கவும்','ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ','ഡാഷ്ബോർഡ് കാണുക','डॅशबोर्ड पहा','ડેશબોર્ડ જુઓ','ড্যাশবোর্ড দেখুন','ਡੈਸ਼ਬੋਰਡ ਵੇਖੋ','ଡ୍ୟାସବୋର୍ଡ ଦେଖନ୍ତୁ'],
  'Crop health insights': ['Crop health insights','फसल स्वास्थ्य जानकारी','పంట ఆరోగ్య సమాచారం','பயிர் ஆரோக்கிய தகவல்கள்','ಬೆಳೆ ಆರೋಗ್ಯ ಮಾಹಿತಿ','വിള ആരോഗ്യ വിവരങ്ങൾ','पीक आरोग्य माहिती','પાકના સ્વાસ્થ્યની માહિતી','ফসলের স্বাস্থ্য তথ্য','ਫਸਲ ਦੀ ਸਿਹਤ ਜਾਣਕਾਰੀ','ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା'],
  'Weather-aware advice': ['Weather-aware advice','मौसम के अनुसार सलाह','వాతావరణ ఆధారిత సూచనలు','வானிலை சார்ந்த ஆலோசனை','ಹವಾಮಾನ ಆಧಾರಿತ ಸಲಹೆ','കാലാവസ്ഥ അനുസരിച്ചുള്ള ഉപദേശം','हवामानानुसार सल्ला','હવામાન આધારિત સલાહ','আবহাওয়া অনুযায়ী পরামর্শ','ਮੌਸਮ ਅਨੁਸਾਰ ਸਲਾਹ','ପାଣିପାଗ ଅନୁସାରେ ପରାମର୍ଶ'],
  'Upload a crop image': ['Upload a crop image','फसल की तस्वीर अपलोड करें','పంట చిత్రాన్ని అప్‌లోడ్ చేయండి','பயிர் படத்தைப் பதிவேற்றவும்','ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ','വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക','पिकाचा फोटो अपलोड करा','પાકનો ફોટો અપલોડ કરો','ফসলের ছবি আপলোড করুন','ਫਸਲ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ','ଫସଲ ଚିତ୍ର ଅପଲୋଡ୍ କରନ୍ତୁ'],
  'Analyze crop health': ['Analyze crop health','फसल के स्वास्थ्य का विश्लेषण करें','పంట ఆరోగ్యాన్ని విశ్లేషించండి','பயிர் ஆரோக்கியத்தை ஆய்வு செய்','ಬೆಳೆ ಆರೋಗ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ','വിളയുടെ ആരോഗ്യം പരിശോധിക്കുക','पिकाच्या आरोग्याचे विश्लेषण करा','પાકના સ્વાસ્થ્યનું વિશ્લેષણ કરો','ফসলের স্বাস্থ্য বিশ্লেষণ করুন','ਫਸਲ ਦੀ ਸਿਹਤ ਦੀ ਜਾਂਚ ਕਰੋ','ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ବିଶ୍ଳେଷଣ କରନ୍ତୁ'],
  'Get local guidance': ['Get local guidance','स्थानीय मार्गदर्शन प्राप्त करें','స్థానిక మార్గదర్శకత్వం పొందండి','உள்ளூர் வழிகாட்டுதலைப் பெறுங்கள்','ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ','പ്രാദേശിക മാർഗനിർദേശം നേടുക','स्थानिक मार्गदर्शन मिळवा','સ્થાનિક માર્ગદર્શન મેળવો','স্থানীয় পরামর্শ পান','ਸਥਾਨਕ ਸਲਾਹ ਲਵੋ','ସ୍ଥାନୀୟ ମାର୍ଗଦର୍ଶନ ପାଆନ୍ତୁ'],
  'Ask the AI assistant': ['Ask the AI assistant','AI सहायक से पूछें','AI సహాయకుడిని అడగండి','AI உதவியாளரிடம் கேளுங்கள்','AI ಸಹಾಯಕರನ್ನು ಕೇಳಿ','AI അസിസ്റ്റന്റിനോട് ചോദിക്കുക','AI सहाय्यकाला विचारा','AI સહાયકને પૂછો','AI সহকারীকে জিজ্ঞাসা করুন','AI ਸਹਾਇਕ ਨੂੰ ਪੁੱਛੋ','AI ସହାୟକଙ୍କୁ ପଚାରନ୍ତୁ'],
  'ABOUT OUR PROJECT': ['ABOUT OUR PROJECT','हमारी परियोजना के बारे में','మా ప్రాజెక్ట్ గురించి','எங்கள் திட்டம் பற்றி','ನಮ್ಮ ಯೋಜನೆಯ ಬಗ್ಗೆ','ഞങ്ങളുടെ പദ്ധതിയെക്കുറിച്ച്','आमच्या प्रकल्पाबद्दल','અમારા પ્રોજેક્ટ વિશે','আমাদের প্রকল্প সম্পর্কে','ਸਾਡੇ ਪ੍ਰੋਜੈਕਟ ਬਾਰੇ','ଆମ ପ୍ରକଳ୍ପ ବିଷୟରେ'],
  'Technology that helps farmers grow better.': ['Technology that helps farmers grow better.','किसानों को बेहतर खेती में मदद करने वाली तकनीक।','రైతులకు మెరుగైన సాగులో సహాయపడే సాంకేతికత.','விவசாயிகள் சிறப்பாக வளர உதவும் தொழில்நுட்பம்.','ರೈತರು ಉತ್ತಮವಾಗಿ ಬೆಳೆ ಬೆಳೆಯಲು ಸಹಾಯ ಮಾಡುವ ತಂತ್ರಜ್ಞಾನ.','കർഷകരെ മികച്ച രീതിയിൽ കൃഷി ചെയ്യാൻ സഹായിക്കുന്ന സാങ്കേതികവിദ്യ.','शेतकऱ्यांना चांगली शेती करण्यास मदत करणारे तंत्रज्ञान.','ખેડૂતોને વધુ સારી ખેતી કરવામાં મદદ કરતી ટેકનોલોજી.','কৃষকদের ভালো চাষে সাহায্যকারী প্রযুক্তি।','ਕਿਸਾਨਾਂ ਨੂੰ ਬਿਹਤਰ ਖੇਤੀ ਵਿੱਚ ਮਦਦ ਕਰਨ ਵਾਲੀ ਤਕਨਾਲੋਜੀ।','ଚାଷୀଙ୍କୁ ଭଲ ଚାଷ କରିବାରେ ସାହାଯ୍ୟ କରୁଥିବା ପ୍ରଯୁକ୍ତିବିଦ୍ୟା।'],
  'Early Crop Screening': ['Early Crop Screening','फसल की शुरुआती जाँच','ప్రారంభ పంట పరీక్ష','ஆரம்ப பயிர் பரிசோதனை','ಆರಂಭಿಕ ಬೆಳೆ ತಪಾಸಣೆ','ആദ്യഘട്ട വിള പരിശോധന','पीकाची प्राथमिक तपासणी','પ્રારંભિક પાક તપાસ','প্রাথমিক ফসল পরীক্ষা','ਫਸਲ ਦੀ ਸ਼ੁਰੂਆਤੀ ਜਾਂਚ','ପ୍ରାରମ୍ଭିକ ଫସଲ ଯାଞ୍ଚ'],
  'Weather Awareness': ['Weather Awareness','मौसम की जानकारी','వాతావరణ అవగాహన','வானிலை விழிப்புணர்வு','ಹವಾಮಾನ ಅರಿವು','കാലാവസ്ഥാ അവബോധം','हवामानाची जाणीव','હવામાનની જાણકારી','আবহাওয়া সচেতনতা','ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ','ପାଣିପାଗ ସଚେତନତା'],
  'Smarter Cultivation': ['Smarter Cultivation','बेहतर खेती','మెరుగైన సాగు','சிறந்த சாகுபடி','ಉತ್ತಮ ಕೃಷಿ','മെച്ചപ്പെട്ട കൃഷി','स्मार्ट शेती','સ્માર્ટ ખેતી','উন্নত চাষাবাদ','ਬਿਹਤਰ ਖੇਤੀ','ଉନ୍ନତ ଚାଷ'],
  'YOUR SMART FARMING TOOLKIT': ['YOUR SMART FARMING TOOLKIT','आपके स्मार्ट खेती के उपकरण','మీ స్మార్ట్ వ్యవసాయ సాధనాలు','உங்கள் ஸ்மார்ட் விவசாய கருவிகள்','ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಾಧನಗಳು','നിങ്ങളുടെ സ്മാർട്ട് കൃഷി ഉപകരണങ്ങൾ','तुमची स्मार्ट शेती साधने','તમારા સ્માર્ટ ખેતી સાધનો','আপনার স্মার্ট কৃষি সরঞ্জাম','ਤੁਹਾਡੇ ਸਮਾਰਟ ਖੇਤੀ ਸੰਦ','ଆପଣଙ୍କ ସ୍ମାର୍ଟ ଚାଷ ଉପକରଣ'],
  'Everything your crops need.': ['Everything your crops need.','आपकी फसलों की हर ज़रूरत।','మీ పంటలకు కావలసిన ప్రతిదీ.','உங்கள் பயிர்களுக்குத் தேவையான அனைத்தும்.','ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ.','നിങ്ങളുടെ വിളകൾക്ക് ആവശ്യമായതെല്ലാം.','तुमच्या पिकांसाठी आवश्यक सर्वकाही.','તમારા પાક માટે જરૂરી બધું.','আপনার ফসলের প্রয়োজনীয় সবকিছু।','ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ ਲਈ ਲੋੜੀਂਦੀ ਹਰ ਚੀਜ਼।','ଆପଣଙ୍କ ଫସଲ ପାଇଁ ଆବଶ୍ୟକ ସବୁକିଛି।'],
  'Crop Analysis': ['Crop Analysis','फसल विश्लेषण','పంట విశ్లేషణ','பயிர் பகுப்பாய்வு','ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ','വിള വിശകലനം','पीक विश्लेषण','પાક વિશ્લેષણ','ফসল বিশ্লেষণ','ਫਸਲ ਵਿਸ਼ਲੇਸ਼ਣ','ଫସଲ ବିଶ୍ଳେଷଣ'],
  'Pest Detection': ['Pest Detection','कीट पहचान','పురుగుల గుర్తింపు','பூச்சி கண்டறிதல்','ಕೀಟ ಪತ್ತೆ','കീടങ്ങളെ കണ്ടെത്തൽ','कीड ओळख','જીવાત શોધ','পোকা শনাক্তকরণ','ਕੀਟਾਂ ਦੀ ਪਛਾਣ','କୀଟ ଚିହ୍ନଟ'],
  'Weather Intelligence': ['Weather Intelligence','मौसम की जानकारी','వాతావరణ సమాచారం','வானிலை தகவல்','ಹವಾಮಾನ ಮಾಹಿತಿ','കാലാവസ്ഥാ വിവരങ്ങൾ','हवामान माहिती','હવામાન માહિતી','আবহাওয়ার তথ্য','ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ','ପାଣିପାଗ ସୂଚନା'],
  'AI Farm Assistant': ['AI Farm Assistant','AI खेती सहायक','AI వ్యవసాయ సహాయకుడు','AI விவசாய உதவியாளர்','AI ಕೃಷಿ ಸಹಾಯಕ','AI കാർഷിക സഹായി','AI शेती सहाय्यक','AI ખેતી સહાયક','AI কৃষি সহকারী','AI ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ','AI କୃଷି ସହାୟକ'],
  'AI IMAGE ANALYSIS': ['AI IMAGE ANALYSIS','AI छवि विश्लेषण','AI చిత్ర విశ్లేషణ','AI பட பகுப்பாய்வு','AI ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ','AI ഇമേജ് വിശകലനം','AI प्रतिमा विश्लेषण','AI છબી વિશ્લેષણ','AI ছবি বিশ্লেষণ','AI ਤਸਵੀਰ ਵਿਸ਼ਲੇਸ਼ਣ','AI ଚିତ୍ର ବିଶ୍ଳେଷଣ'],
  'Your crop, under the lens.': ['Your crop, under the lens.','आपकी फसल की जाँच।','మీ పంటను పరిశీలించండి.','உங்கள் பயிரை ஆய்வு செய்யுங்கள்.','ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.','നിങ്ങളുടെ വിള പരിശോധിക്കൂ.','तुमच्या पिकाची तपासणी.','તમારા પાકની તપાસ.','আপনার ফসল পরীক্ষা করুন।','ਆਪਣੀ ਫਸਲ ਦੀ ਜਾਂਚ ਕਰੋ।','ଆପଣଙ୍କ ଫସଲ ଯାଞ୍ଚ କରନ୍ତୁ।'],
  'Drop your crop image here': ['Drop your crop image here','अपनी फसल की तस्वीर यहाँ डालें','మీ పంట చిత్రాన్ని ఇక్కడ వేయండి','உங்கள் பயிர் படத்தை இங்கே இடவும்','ನಿಮ್ಮ ಬೆಳೆ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ','നിങ്ങളുടെ വിളയുടെ ചിത്രം ഇവിടെ ഇടുക','तुमच्या पिकाचा फोटो येथे टाका','તમારા પાકનો ફોટો અહીં મૂકો','আপনার ফসলের ছবি এখানে দিন','ਆਪਣੀ ਫਸਲ ਦੀ ਤਸਵੀਰ ਇੱਥੇ ਪਾਓ','ଆପଣଙ୍କ ଫସଲ ଚିତ୍ର ଏଠାରେ ଦିଅନ୍ତୁ'],
  'Analyze image': ['Analyze image','तस्वीर का विश्लेषण करें','చిత్రాన్ని విశ్లేషించండి','படத்தை ஆய்வு செய்','ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ','ചിത്രം പരിശോധിക്കുക','प्रतिमेचे विश्लेषण करा','છબીનું વિશ્લેષણ કરો','ছবি বিশ্লেষণ করুন','ਤਸਵੀਰ ਦੀ ਜਾਂਚ ਕਰੋ','ଚିତ୍ର ବିଶ୍ଳେଷଣ କରନ୍ତୁ'],
  'ANALYSIS REPORT': ['ANALYSIS REPORT','विश्लेषण रिपोर्ट','విశ్లేషణ నివేదిక','பகுப்பாய்வு அறிக்கை','ವಿಶ್ಲೇಷಣೆ ವರದಿ','വിശകലന റിപ്പോർട്ട്','विश्लेषण अहवाल','વિશ્લેષણ અહેવાલ','বিশ্লেষণ প্রতিবেদন','ਵਿਸ਼ਲੇਸ਼ਣ ਰਿਪੋਰਟ','ବିଶ୍ଳେଷଣ ରିପୋର୍ଟ'],
  'What we found': ['What we found','हमें क्या मिला','మేము గుర్తించినవి','நாங்கள் கண்டறிந்தவை','ನಾವು ಕಂಡುಕೊಂಡದ್ದು','ഞങ്ങൾ കണ്ടെത്തിയത്','आम्हाला काय आढळले','અમને શું મળ્યું','আমরা যা পেয়েছি','ਸਾਨੂੰ ਕੀ ਮਿਲਿਆ','ଆମେ କଣ ପାଇଲୁ'],
  'Your analysis will appear here': ['Your analysis will appear here','आपका विश्लेषण यहाँ दिखाई देगा','మీ విశ్లేషణ ఇక్కడ కనిపిస్తుంది','உங்கள் பகுப்பாய்வு இங்கே தோன்றும்','ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ','നിങ്ങളുടെ വിശകലനം ഇവിടെ കാണിക്കും','तुमचे विश्लेषण येथे दिसेल','તમારું વિશ્લેષણ અહીં દેખાશે','আপনার বিশ্লেষণ এখানে দেখা যাবে','ਤੁਹਾਡਾ ਵਿਸ਼ਲੇਸ਼ਣ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗਾ','ଆପଣଙ୍କ ବିଶ୍ଳେଷଣ ଏଠାରେ ଦେଖାଯିବ'],
  'LOCAL ENVIRONMENT': ['LOCAL ENVIRONMENT','स्थानीय वातावरण','స్థానిక వాతావరణం','உள்ளூர் சூழல்','ಸ್ಥಳೀಯ ಪರಿಸರ','പ്രാദേശിക പരിസ്ഥിതി','स्थानिक वातावरण','સ્થાનિક વાતાવરણ','স্থানীয় পরিবেশ','ਸਥਾਨਕ ਵਾਤਾਵਰਣ','ସ୍ଥାନୀୟ ପରିବେଶ'],
  'Know what’s happening outside.': ['Know what’s happening outside.','बाहर के मौसम की जानकारी रखें।','బయట ఏమి జరుగుతుందో తెలుసుకోండి.','வெளியே என்ன நடக்கிறது என்பதை அறியுங்கள்.','ಹೊರಗೆ ಏನಾಗುತ್ತಿದೆ ಎಂದು ತಿಳಿಯಿರಿ.','പുറത്ത് എന്താണ് സംഭവിക്കുന്നതെന്ന് അറിയുക.','बाहेर काय घडत आहे ते जाणून घ्या.','બહાર શું થઈ રહ્યું છે તે જાણો.','বাইরে কী ঘটছে তা জানুন।','ਬਾਹਰ ਕੀ ਹੋ ਰਿਹਾ ਹੈ ਜਾਣੋ।','ବାହାରେ କଣ ଘଟୁଛି ଜାଣନ୍ତୁ।'],
  'Use my location': ['Use my location','मेरी लोकेशन इस्तेमाल करें','నా స్థానాన్ని ఉపయోగించండి','எனது இருப்பிடத்தைப் பயன்படுத்து','ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ','എന്റെ സ്ഥാനം ഉപയോഗിക്കുക','माझे स्थान वापरा','મારું સ્થાન વાપરો','আমার অবস্থান ব্যবহার করুন','ਮੇਰੀ ਸਥਿਤੀ ਵਰਤੋ','ମୋ ଅବସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ'],
  'Temperature': ['Temperature','तापमान','ఉష్ణోగ్రత','வெப்பநிலை','ತಾಪಮಾನ','താപനില','तापमान','તાપમાન','তাপমাত্রা','ਤਾਪਮਾਨ','ତାପମାତ୍ରା'],
  'Humidity': ['Humidity','नमी','తేమ','ஈரப்பதம்','ತೇವಾಂಶ','ഈർപ്പം','आर्द्रता','ભેજ','আর্দ্রতা','ਨਮੀ','ଆର୍ଦ୍ରତା'],
  'Rainfall': ['Rainfall','वर्षा','వర్షపాతం','மழைப்பொழிவு','ಮಳೆ','മഴ','पाऊस','વરસાદ','বৃষ্টিপাত','ਬਾਰਿਸ਼','ବର୍ଷା'],
  'Wind': ['Wind','हवा','గాలి','காற்று','ಗಾಳಿ','കാറ്റ്','वारा','પવન','বাতাস','ਹਵਾ','ପବନ'],
  'PERSONALIZED CULTIVATION': ['PERSONALIZED CULTIVATION','व्यक्तिगत खेती मार्गदर्शन','వ్యక్తిగత సాగు మార్గదర్శకం','தனிப்பயன் சாகுபடி வழிகாட்டுதல்','ವೈಯಕ್ತಿಕ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ','വ്യക്തിഗത കൃഷി മാർഗനിർദേശം','वैयक्तिक शेती मार्गदर्शन','વ્યક્તિગત ખેતી માર્ગદર્શન','ব্যক্তিগত চাষাবাদ নির্দেশিকা','ਵਿਅਕਤੀਗਤ ਖੇਤੀ ਮਾਰਗਦਰਸ਼ਨ','ବ୍ୟକ୍ତିଗତ ଚାଷ ମାର୍ଗଦର୍ଶନ'],
  'Guidance for your growing season.': ['Guidance for your growing season.','आपके फसल मौसम के लिए मार्गदर्शन।','మీ పంట కాలానికి మార్గదర్శకం.','உங்கள் பயிர் பருவத்திற்கான வழிகாட்டுதல்.','ನಿಮ್ಮ ಬೆಳೆ ಋತುವಿಗೆ ಮಾರ್ಗದರ್ಶನ.','നിങ്ങളുടെ കൃഷിക്കാലത്തിനുള്ള മാർഗനിർദേശം.','तुमच्या पीक हंगामासाठी मार्गदर्शन.','તમારી પાકની મોસમ માટે માર્ગદર્શન.','আপনার ফসলের মৌসুমের জন্য নির্দেশিকা।','ਤੁਹਾਡੇ ਫਸਲੀ ਮੌਸਮ ਲਈ ਮਾਰਗਦਰਸ਼ਨ।','ଆପଣଙ୍କ ଫସଲ ଋତୁ ପାଇଁ ମାର୍ଗଦର୍ଶନ।'],
  'Soil type': ['Soil type','मिट्टी का प्रकार','నేల రకం','மண் வகை','ಮಣ್ಣಿನ ವಿಧ','മണ്ണിന്റെ തരം','मातीचा प्रकार','માટીનો પ્રકાર','মাটির ধরন','ਮਿੱਟੀ ਦੀ ਕਿਸਮ','ମାଟିର ପ୍ରକାର'],
  'Growth stage': ['Growth stage','विकास का चरण','పెరుగుదల దశ','வளர்ச்சி நிலை','ಬೆಳವಣಿಗೆಯ ಹಂತ','വളർച്ചാ ഘട്ടം','वाढीचा टप्पा','વિકાસનો તબક્કો','বৃদ্ধির পর্যায়','ਵਿਕਾਸ ਦਾ ਪੜਾਅ','ବୃଦ୍ଧି ପର୍ଯ୍ୟାୟ'],
  'Get cultivation guidance': ['Get cultivation guidance','खेती संबंधी सलाह प्राप्त करें','సాగు మార్గదర్శకత్వం పొందండి','சாகுபடி வழிகாட்டுதலைப் பெறுங்கள்','ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ','കൃഷി മാർഗനിർദേശം നേടുക','शेती मार्गदर्शन मिळवा','ખેતી માર્ગદર્શન મેળવો','চাষাবাদের পরামর্শ পান','ਖੇਤੀਬਾੜੀ ਸਲਾਹ ਲਵੋ','ଚାଷ ମାର୍ଗଦର୍ଶନ ପାଆନ୍ତୁ'],
  'YOUR FARMING COMPANION': ['YOUR FARMING COMPANION','आपका खेती साथी','మీ వ్యవసాయ సహచరుడు','உங்கள் விவசாய துணை','ನಿಮ್ಮ ಕೃಷಿ ಸಂಗಾತಿ','നിങ്ങളുടെ കാർഷിക സഹായി','तुमचा शेती सोबती','તમારો ખેતી સાથી','আপনার কৃষি সঙ্গী','ਤੁਹਾਡਾ ਖੇਤੀ ਸਾਥੀ','ଆପଣଙ୍କ କୃଷି ସାଥୀ'],
  'Questions from the field?': ['Questions from the field?','खेती से जुड़े सवाल हैं?','వ్యవసాయం గురించి ప్రశ్నలు ఉన్నాయా?','விவசாயம் குறித்த கேள்விகளா?','ಕೃಷಿಯ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?','കൃഷിയെക്കുറിച്ച് ചോദ്യങ്ങളുണ്ടോ?','शेतीविषयी प्रश्न आहेत का?','ખેતી વિશે પ્રશ્નો છે?','কৃষি নিয়ে প্রশ্ন আছে?','ਖੇਤੀ ਬਾਰੇ ਸਵਾਲ ਹਨ?','ଚାଷ ବିଷୟରେ ପ୍ରଶ୍ନ ଅଛି କି?'],
  Send: ['Send','भेजें','పంపండి','அனுப்பு','ಕಳುಹಿಸಿ','അയയ്ക്കുക','पाठवा','મોકલો','পাঠান','ਭੇਜੋ','ପଠାନ୍ତୁ'],
  'Built for informed, sustainable farming.': ['Built for informed, sustainable farming.','जागरूक और टिकाऊ खेती के लिए बनाया गया।','సమాచారంతో కూడిన సుస్థిర వ్యవసాయం కోసం రూపొందించబడింది.','தகவலறிந்த நிலையான விவசாயத்திற்காக உருவாக்கப்பட்டது.','ಮಾಹಿತಿಯುಕ್ತ ಸುಸ್ಥಿರ ಕೃಷಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.','അറിവോടെയുള്ള സുസ്ഥിര കൃഷിക്കായി നിർമ്മിച്ചത്.','माहितीपूर्ण आणि शाश्वत शेतीसाठी तयार केलेले.','જાગૃત અને ટકાઉ ખેતી માટે બનાવેલ.','সচেতন ও টেকসই কৃষির জন্য তৈরি।','ਜਾਣਕਾਰੀ ਭਰਪੂਰ ਅਤੇ ਟਿਕਾਊ ਖੇਤੀ ਲਈ ਬਣਾਇਆ ਗਿਆ।','ସଚେତନ ଓ ସ୍ଥାୟୀ ଚାଷ ପାଇଁ ନିର୍ମିତ।']
};

const languageIndex = Object.fromEntries(langs.map((name, index) => [name, index]));

function App() {
  const [lang, setLang] = useState('English');
  const t = (key) => words[key]?.[languageIndex[lang]] || key;

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [busy, setBusy] = useState(false);
  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState('');
  const [crop, setCrop] = useState('Tomato');
  const [question, setQuestion] = useState('How can I keep my crop healthy?');
  const [chat, setChat] = useState('');
  const [chatBusy, setChatBusy] = useState(false);
  const [soil, setSoil] = useState('Not sure');
  const [stage, setStage] = useState('Vegetative');
  const [advice, setAdvice] = useState([]);
  const [adviceBusy, setAdviceBusy] = useState(false);
  const [adviceError, setAdviceError] = useState('');

  const current = weather?.current;

  function choose(f) {
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      alert('Please select a JPG, PNG or WEBP image.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10 MB.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setAnalysis(null);
  }

  async function scan() {
    if (!file) {
      alert('Please select an image first.');
      return;
    }
    setBusy(true);
    setAnalysis(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('language', lang);
      const r = await fetch(`${API}/api/analyze`, { method: 'POST', body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.detail || 'Image analysis failed.');
      setAnalysis(d);
    } catch (e) {
      alert('Analysis error: ' + e.message);
    } finally {
      setBusy(false);
    }
  }

  async function locate() {
    if (!navigator.geolocation) {
      alert('Location is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(async (p) => {
      const latitude = p.coords.latitude;
      const longitude = p.coords.longitude;
      setPlace(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
      try {
        const r = await fetch(`${API}/api/weather?latitude=${latitude}&longitude=${longitude}`);
        const d = await r.json();
        if (!r.ok) throw new Error(d.detail || 'Weather request failed.');
        setWeather(d);
      } catch (e) {
        alert('Could not load weather: ' + e.message);
      }
    }, () => alert('Please allow location access.'), {
      enableHighAccuracy: true, timeout: 12000
    });
  }

  async function ask(e) {
    e.preventDefault();
    if (!question.trim()) return;
    setChatBusy(true);
    try {
      const r = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question, language: lang, crop, location: place, weather: current || {}
        })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(typeof d.detail === 'string' ? d.detail : JSON.stringify(d.detail || d));
      setChat(typeof d === 'string' ? d : d.answer || d.response || JSON.stringify(d));
    } catch (e) {
      setChat('Error: ' + e.message);
    } finally {
      setChatBusy(false);
    }
  }

  async function getAdvice() {
    setAdviceBusy(true);
    setAdviceError('');
    setAdvice([]);
    try {
      const r = await fetch(`${API}/api/advice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop, location: place || 'Not provided', language: lang,
          soil_type: soil, growth_stage: stage,
          temperature_c: current?.temperature_2m,
          humidity: current?.relative_humidity_2m,
          rainfall_mm: current?.precipitation
        })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.detail || 'Could not get cultivation advice.');
      setAdvice(Array.isArray(d.recommendations) ? d.recommendations : [d.message || JSON.stringify(d)]);
    } catch (e) {
      setAdviceError(e.message);
    } finally {
      setAdviceBusy(false);
    }
  }

  return (
    <div className="app">
      
<header>
  <div className="brand">
    <img
      src="/pesteye-logo.jpeg"
      alt="PestEye AI Logo"
      className="brand-logo-img"
    />
    <span>
      PestEye <b>AI</b>
      <small>SMART FARMING ASSISTANT</small>
    </span>
  </div>

  <nav>
    <a href="#about">{t('About')}</a>
    <a href="#features">{t('Features')}</a>
    <a href="#scanner">{t('Crop Scanner')}</a>
    <a href="#weather">{t('Weather')}</a>
    <a href="#assistant">{t('AI Assistant')}</a>
  </nav>

  <select
    aria-label="Language"
    value={lang}
    onChange={(e) => setLang(e.target.value)}
  >
    {langs.map((x) => (
      <option key={x}>{x}</option>
    ))}
  </select>
</header>


      <main>
        <section className="hero">
          <div>
            <div className="eyebrow"><span className="dot" />{t('INTELLIGENCE FOR EVERY FIELD')}</div>
            <h1>{t('Grow smarter.')}<br /><em>{t('Farm better.')}</em></h1>
            <p>{t('AI-powered crop insights, local weather intelligence and practical farming guidance — in your language.')}</p>
            <div className="hero-actions">
              <a className="primary" href="#scanner">{t('Analyze my crop')} <ScanSearch size={17} /></a>
              <a className="secondary" href="#weather">{t('Explore dashboard')}</a>
            </div>
            <div className="trust">
              <span><Leaf size={15} /> {t('Crop health insights')}</span>
              <span><CloudSun size={15} /> {t('Weather-aware advice')}</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="sun" /><div className="field f1" /><div className="field f2" /><div className="field f3" />
            <div className="art-card"><Sprout /><span><b>Healthier fields start here</b><small>Understand your crop, one photo at a time.</small></span></div>
          </div>
        </section>

        <section className="stats">
          <div><b>01</b><span>{t('Upload a crop image')}</span></div>
          <div><b>02</b><span>{t('Analyze crop health')}</span></div>
          <div><b>03</b><span>{t('Get local guidance')}</span></div>
          <div><b>04</b><span>{t('Ask the AI assistant')}</span></div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-head"><div>
            <div className="eyebrow">{t('ABOUT OUR PROJECT')}</div>
            <h2>{t('Technology that helps farmers grow better.')}</h2>
            <p>PestEye AI is a smart farming assistant designed to make crop health information and practical farming guidance easier to access.</p>
          </div></div>
          <div className="about-grid">
            <div className="about-card"><ScanSearch /><h3>{t('Early Crop Screening')}</h3><p>Analyze crop images to screen for supported diseases and pests.</p></div>
            <div className="about-card"><CloudSun /><h3>{t('Weather Awareness')}</h3><p>Use local weather information to support better farming decisions.</p></div>
            <div className="about-card"><Sprout /><h3>{t('Smarter Cultivation')}</h3><p>Receive crop-specific recommendations based on soil and growth stage.</p></div>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="section-head"><div>
            <div className="eyebrow">{t('YOUR SMART FARMING TOOLKIT')}</div>
            <h2>{t('Everything your crops need.')}</h2>
            <p>Smart insights to help you make informed farming decisions.</p>
          </div></div>
          <div className="features-grid">
            <a href="#scanner" className="feature-card"><span className="feature-icon"><ScanSearch /></span><h3>{t('Crop Analysis')}</h3><p>Upload crop images and receive AI-powered screening insights.</p><span className="feature-link">Explore scanner →</span></a>
            <a href="#scanner" className="feature-card"><span className="feature-icon"><AlertTriangle /></span><h3>{t('Pest Detection')}</h3><p>Screen crop images for supported pest categories.</p><span className="feature-link">Detect pests →</span></a>
            <a href="#weather" className="feature-card"><span className="feature-icon"><CloudSun /></span><h3>{t('Weather Intelligence')}</h3><p>Check local weather conditions and forecast information.</p><span className="feature-link">Check weather →</span></a>
            <a href="#assistant" className="feature-card"><span className="feature-icon"><MessageCircle /></span><h3>{t('AI Farm Assistant')}</h3><p>Ask farming questions and receive guidance in your language.</p><span className="feature-link">Ask assistant →</span></a>
          </div>
        </section>

        <section className="section" id="scanner">
          <div className="section-head"><div>
            <div className="eyebrow">{t('AI IMAGE ANALYSIS')}</div>
            <h2>{t('Your crop, under the lens.')}</h2>
            <p>Upload a clear photo of a leaf, plant or visible pest.</p>
          </div><span className="tag">Image lab</span></div>
          <div className="scanner-grid">
            <div className="upload-panel">
              <label className="dropzone">
                {preview ? <img src={preview} alt="Selected crop" /> : <>
                  <span className="upload-icon"><Upload /></span>
                  <b>{t('Drop your crop image here')}</b>
                  <small>or click to browse · JPG, PNG, WEBP · max 10 MB</small>
                </>}
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => choose(e.target.files[0])} />
              </label>
              <button className="primary full" disabled={!file || busy} onClick={scan}>
                {busy ? <><LoaderCircle className="spin" /> Analyzing...</> : <>{t('Analyze image')} <ScanSearch size={17} /></>}
              </button>
              <p className="hint">For best results, photograph the affected area in natural light and include the whole leaf.</p>
            </div>

            <div className="result-panel">
              <div className="result-title"><div><span className="eyebrow">{t('ANALYSIS REPORT')}</span><h3>{t('What we found')}</h3></div><span className="live"><i /> AI status</span></div>
              {!analysis ? <div className="empty"><ScanSearch size={34} /><b>{t('Your analysis will appear here')}</b><span>Upload an image to begin. Predictions require trained models.</span></div> : <div className="report">
                <div className="report-item"><span>Crop identification</span><b>{analysis.crop_identification?.crop || analysis.crop_identification?.prediction || 'Uncertain'}</b><small>{analysis.crop_identification?.message || 'Crop identification information unavailable.'}</small></div>
                <div className="report-item"><span>Disease screening</span><b>{analysis.disease?.status === 'uncertain' ? 'Uncertain' : analysis.disease?.prediction || analysis.disease?.status?.replaceAll('_', ' ') || 'Unavailable'}</b><small>{analysis.disease?.confidence != null ? `Model confidence: ${(analysis.disease.confidence * 100).toFixed(1)}%` : analysis.disease?.message || 'Disease screening information unavailable.'} · Screening result only; not a confirmed diagnosis.</small></div>
                <div className="report-item"><span>Pest detection</span><b>{analysis.pests?.detections?.length ? analysis.pests.detections.map((p) => p.label).join(', ') : analysis.pests?.status === 'prediction' ? 'No pests detected' : analysis.pests?.status?.replaceAll('_', ' ') || 'No result available'}</b><small>{analysis.pests?.detections?.length ? analysis.pests.detections.map((p) => p.confidence != null ? `${p.label}: ${(p.confidence * 100).toFixed(1)}%` : p.label).join(' | ') : analysis.pests?.message || 'No pests detected.'}</small></div>
                <p className="safety"><AlertTriangle size={16} />{analysis.safety_note || 'AI results are screening support, not a confirmed diagnosis. Consult an agricultural expert before applying pesticides.'}</p>
              </div>}
            </div>
          </div>
        </section>

        <section className="section weather-section" id="weather">
          <div className="section-head"><div>
            <div className="eyebrow">{t('LOCAL ENVIRONMENT')}</div>
            <h2>{t('Know what’s happening outside.')}</h2>
            <p>Use your location to load live conditions and a five-day forecast.</p>
          </div>
          <button className="secondary" onClick={locate}><MapPin size={16} /> {t('Use my location')}</button></div>
          <div className="weather-card">
            <div className="weather-main"><CloudSun size={38} /><div><small>YOUR FIELD LOCATION</small><h3>{place || 'Location not added'}</h3><span>{current ? 'Current conditions' : 'Allow location access to view weather'}</span></div></div>
            <div className="weather-metrics">
              <div><small>{t('Temperature')}</small><b>{current ? `${current.temperature_2m}°C` : '—'}</b></div>
              <div><small>{t('Humidity')}</small><b>{current ? `${current.relative_humidity_2m}%` : '—'}</b></div>
              <div><small>{t('Rainfall')}</small><b>{current ? `${current.precipitation} mm` : '—'}</b></div>
              <div><small>{t('Wind')}</small><b>{current ? `${current.wind_speed_10m} km/h` : '—'}</b></div>
            </div>
          </div>
          {weather?.daily && <div className="forecast">{weather.daily.time.map((day, i) => <div key={day}>
            <small>{new Date(day + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short' })}</small><CloudSun />
            <b>{weather.daily.temperature_2m_max[i]}° / {weather.daily.temperature_2m_min[i]}°</b>
            <small>Rain chance {weather.daily.precipitation_probability_max[i]}%</small>
          </div>)}</div>}
          <p className="hint">Weather forecasts are environmental context, not a disease prediction. Check local advisories before field operations.</p>
        </section>

        <section className="section advice-section">
          <div className="section-head"><div>
            <div className="eyebrow">{t('PERSONALIZED CULTIVATION')}</div>
            <h2>{t('Guidance for your growing season.')}</h2>
            <p>Start with your crop and field details.</p>
          </div></div>
          <div className="advice-form">
            <label>Crop<select value={crop} onChange={(e) => setCrop(e.target.value)}>{['Tomato','Rice','Wheat','Groundnut','Cotton','Maize','Chilli','Sugarcane','Other'].map((x) => <option key={x}>{x}</option>)}</select></label>
            <label>{t('Soil type')}<select value={soil} onChange={(e) => setSoil(e.target.value)}>{['Not sure','Sandy','Clay','Loamy','Black soil','Red soil','Alluvial'].map((x) => <option key={x}>{x}</option>)}</select></label>
            <label>{t('Growth stage')}<select value={stage} onChange={(e) => setStage(e.target.value)}>{['Sowing','Seedling','Vegetative','Flowering','Fruiting','Harvest'].map((x) => <option key={x}>{x}</option>)}</select></label>
            <button className="primary" onClick={getAdvice} disabled={adviceBusy}>{adviceBusy ? 'Generating...' : t('Get cultivation guidance')}</button>
          </div>
          {adviceBusy && <p className="hint">Preparing your farming recommendations...</p>}
          {adviceError && <p className="advice-error">Error: {adviceError}</p>}
          {advice.length > 0 && <div className="advice-results"><h3>Recommended farming practices</h3>
            {advice.map((item, index) => <div className="advice-result-card" key={index}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}
            <small>AI-generated guidance. Confirm important farming decisions with a local agricultural expert.</small>
          </div>}
        </section>

        <section className="section chatbot" id="assistant">
          <div>
            <div className="eyebrow">{t('YOUR FARMING COMPANION')}</div>
            <h2>{t('Questions from the field?')}</h2>
            <p>Ask about crop care, symptoms, irrigation or seasonal planning. Choose your preferred language above.</p>
            <div className="chat-note"><Languages /> Multilingual responses depend on your configured AI language model.</div>
          </div>
          <form className="chatbox" onSubmit={ask}>
            <div className="chat-head"><span className="avatar"><MessageCircle /></span><div><b>PestEye Assistant</b><small>Farming information assistant</small></div><span className="online">● Ready</span></div>
            <div className="chat-answer">{chat || 'Namaste! Ask me a question about your crop. Share your crop, location and growth stage for more useful guidance.'}</div>
            <div className="chat-input">
              <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask your farming question..." required />
              <button className="primary" disabled={chatBusy}>{chatBusy ? '...' : t('Send')}</button>
            </div>
          </form>
        </section>
      
        {/* SEO CONTENT FOR FARMING SEARCHES */}
        <section className="section seo-content" id="farming-guide">
          <div className="section-head">
            <div>
              <div className="eyebrow">SMART FARMING KNOWLEDGE</div>
              <h2>AI Crop Disease Detection and Smart Farming Assistance</h2>
              <p>
                PestEye AI helps farmers understand crop health, identify
                possible pest and disease problems, and access practical
                farming guidance using artificial intelligence.
              </p>
            </div>
          </div>

          <div className="about-grid">
            <article className="about-card">
              <h3>AI Crop Disease Detection</h3>
              <p>
                Upload a clear image of an affected plant or leaf to receive
                AI-powered crop health screening. Early identification of
                possible symptoms can help farmers decide when to seek
                further agricultural advice.
              </p>
              <a href="#scanner">Try crop disease screening →</a>
            </article>

            <article className="about-card">
              <h3>Plant Pest Identification</h3>
              <p>
                PestEye AI can screen crop images for supported pest
                categories. Recognizing visible pest damage can help farmers
                investigate crop problems and take informed action.
              </p>
              <a href="#scanner">Explore pest detection →</a>
            </article>

            <article className="about-card">
              <h3>AI Farming Assistant</h3>
              <p>
                Get crop-specific cultivation guidance based on crop type,
                soil type and growth stage. Ask questions about irrigation,
                crop care and farming practices.
              </p>
              <a href="#assistant">Ask the farming assistant →</a>
            </article>

            <article className="about-card">
              <h3>Weather-Based Farming Support</h3>
              <p>
                Access local weather conditions and forecast information
                to better understand environmental conditions affecting
                your farm.
              </p>
              <a href="#weather">Check local weather →</a>
            </article>
          </div>

          <div className="section-head">
            <div>
              <h2>Why Use PestEye AI?</h2>
              <p>
                PestEye AI brings crop image screening, weather information
                and multilingual farming assistance together in one place.
                It is designed to make useful farming information easier
                to access.
              </p>
            </div>
          </div>

          <p className="hint">
            Important: AI predictions are screening support, not confirmed
            agricultural diagnoses. Consult an agricultural expert before
            making treatment decisions or applying pesticides.
          </p>
        </section>

      </main>

      <footer>
        <div className="brand"><span className="logo"><Sprout /></span><span>PestEye <b>AI</b><small>SMART FARMING ASSISTANT</small></span></div>
        <span>{t('Built for informed, sustainable farming.')}</span>
        <small>AI screening is not a substitute for agricultural expert diagnosis.</small>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
