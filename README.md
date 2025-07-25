# 🧠 ChatGPT Clone مجاني - Frontend فقط

تطبيق دردشة تفاعلي يشبه ChatGPT مبني بـ Next.js و TailwindCSS، يدعم موديلات متعددة من الذكاء الاصطناعي مع إمكانيات توليد الصور والصوت.

## ✨ المميزات

### 💬 واجهة دردشة متقدمة
- **موديلات متعددة**: دعم OpenAI GPT-4o-mini, GPT-3.5-turbo, Google Gemini Pro, DeepSeek Chat
- **streaming responses**: استجابات فورية مع تأثيرات بصرية
- **إدارة المحادثات**: حفظ، استرجاع، وتصدير المحادثات
- **أدوات تفاعلية**: إعادة توليد، تعديل، وحذف الرسائل

### 🎨 توليد الصور
- **HiDream**: نموذج متقدم لتوليد صور سريعة وعالية الجودة
- **عرض متقدم**: عرض الصور مع إمكانية التحميل
- **واجهة سهلة**: تبديل سريع بين وضع الدردشة ووضع توليد الصور

### 🔊 معالجة الصوت
- **تحويل النص إلى صوت**: TTS باستخدام Web Speech API
- **تحويل الصوت إلى نص**: STT مع دعم اللغة العربية
- **تحكم كامل**: إيقاف وتشغيل الصوت حسب الحاجة

### 📁 إدارة الملفات
- **رفع متعدد**: دعم PDF, صور, ملفات صوتية
- **عرض مبدئي**: معاينة الملفات قبل الإرسال
- **إدارة ذكية**: حذف وتعديل الملفات المرفقة

### 💾 تخزين محلي
- **حفظ تلقائي**: حفظ المحادثات كل 30 ثانية
- **تصدير JSON**: تصدير المحادثات للنسخ الاحتياطي
- **شريط جانبي**: تصفح سريع للمحادثات المحفوظة

## 🚀 التثبيت والتشغيل

```bash
# تثبيت المتطلبات
npm install

# تشغيل التطبيق
npm run dev
```

## ⚙️ الإعداد

1. **قم بإنشاء ملف `.env.local` في جذر المشروع**:

```bash
# OpenAI API Key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key_here

# Google Gemini API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here

# DeepSeek API Key
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_key_here

# Replicate API Key (for image generation)
NEXT_PUBLIC_REPLICATE_API_KEY=your_replicate_key_here
```

2. **احصل على مفاتيح API**:
   - [OpenAI API Key](https://platform.openai.com/api-keys)
   - [Google Gemini API Key](https://makersuite.google.com/app/apikey)
   - [DeepSeek API Key](https://platform.deepseek.com/api_keys)
   - [Replicate API Key](https://replicate.com/account/api-tokens)

3. **أعد تشغيل الخادم**:
```bash
npm run dev
```

## 🛡️ الأمان والخصوصية

- **متغيرات البيئة**: جميع مفاتيح API محفوظة في ملف .env.local على الخادم
- **تخزين محلي**: المحادثات محفوظة في متصفحك فقط
- **لا توجد خوادم**: التطبيق يعمل بالكامل في المتصفح
- **شفافية كاملة**: الكود مفتوح المصدر ومتاح للمراجعة

## 🔧 التقنيات المستخدمة

- **Frontend**: Next.js 13, React, TypeScript
- **التصميم**: TailwindCSS, Shadcn/ui
- **الأيقونات**: Lucide React
- **APIs**: OpenAI, Google Gemini, DeepSeek, Replicate
- **توليد الصور**: Replicate (Stable Diffusion XL, HiDream)
- **الصوت**: Web Speech API, SpeechRecognition

## 📱 الميزات التقنية

- **تصميم متجاوب**: يعمل على جميع الأجهزة
- **وضع داكن**: دعم كامل للأوضاع الداكنة/الفاتحة
- **RTL**: دعم اللغة العربية بشكل كامل
- **إمكانية الوصول**: متوافق مع معايير الوصول

## 🎯 حالات الاستخدام

- **الطلاب**: مساعدة في الواجبات والأبحاث
- **المطورين**: مساعدة في البرمجة وحل المشاكل
- **المبدعين**: توليد أفكار ومحتوى إبداعي
- **الأعمال**: مساعدة في الكتابة والتحليل

## 🤝 المساهمة

نرحب بجميع المساهمات! يمكنك:
- الإبلاغ عن المشاكل
- اقتراح ميزات جديدة
- تحسين الكود
- ترجمة التطبيق

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 الشكر

شكر خاص لـ:
- OpenAI لواجهة GPT API
- Google لـ Gemini API
- DeepSeek لنموذج DeepSeek Chat
- Replicate لـ Stable Diffusion API
- مجتمع المطورين مفتوح المصدر

---

💡 **نصيحة**: احفظ مفاتيح API بشكل آمن ولا تشاركها مع الآخرين.

🔗 **روابط مفيدة**:
- [الوثائق الفنية](docs/)
- [الأسئلة الشائعة](FAQ.md)
- [دليل المطورين](CONTRIBUTING.md)