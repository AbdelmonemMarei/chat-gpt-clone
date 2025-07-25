"use client";

import { X, Key, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  if (!isOpen) return null;

  const apiKeys = {
    openai: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    gemini: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    deepseek: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
    replicate: process.env.NEXT_PUBLIC_REPLICATE_API_KEY,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Key size={20} />
              إعدادات API
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          <CardDescription>
            حالة مفاتيح API المكونة في متغيرات البيئة
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="status" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="status">حالة المفاتيح</TabsTrigger>
              <TabsTrigger value="info">معلومات</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">OpenAI API Key</h3>
                    <p className="text-sm text-gray-500">GPT-4o-mini, GPT-3.5-turbo</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {apiKeys.openai ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-green-600">مكون</span>
                      </>
                    ) : (
                      <>
                        <X size={16} className="text-red-500" />
                        <span className="text-sm text-red-600">غير مكون</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Google Gemini API Key</h3>
                    <p className="text-sm text-gray-500">Gemini Pro</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {apiKeys.gemini ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-green-600">مكون</span>
                      </>
                    ) : (
                      <>
                        <X size={16} className="text-red-500" />
                        <span className="text-sm text-red-600">غير مكون</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">DeepSeek API Key</h3>
                    <p className="text-sm text-gray-500">DeepSeek Chat</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {apiKeys.deepseek ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-green-600">مكون</span>
                      </>
                    ) : (
                      <>
                        <X size={16} className="text-red-500" />
                        <span className="text-sm text-red-600">غير مكون</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Replicate API Key</h3>
                    <p className="text-sm text-gray-500">Stable Diffusion XL, HiDream</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {apiKeys.replicate ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-green-600">مكون</span>
                      </>
                    ) : (
                      <>
                        <X size={16} className="text-red-500" />
                        <span className="text-sm text-red-600">غير مكون</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  كيفية تكوين المفاتيح:
                </h4>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>1. أضف المفاتيح في ملف <code>.env.local</code></li>
                  <li>2. استخدم البادئة <code>NEXT_PUBLIC_</code></li>
                  <li>3. أعد تشغيل الخادم بعد التغيير</li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">حول التطبيق</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      هذا التطبيق يستخدم متغيرات البيئة لتخزين مفاتيح API بشكل آمن.
                      جميع المفاتيح محفوظة في ملف .env.local ولا يتم إرسالها للمتصفح.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">الميزات المتاحة:</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• دردشة مع موديلات متعددة (OpenAI, Gemini, DeepSeek)</li>
                    <li>• توليد صور بـ Stable Diffusion XL و HiDream</li>
                    <li>• تحويل النص إلى صوت (TTS)</li>
                    <li>• تحويل الصوت إلى نص (STT)</li>
                    <li>• رفع ملفات متعددة</li>
                    <li>• حفظ وتصدير المحادثات</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">الأمان:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    جميع مفاتيح API محفوظة في متغيرات البيئة على الخادم.
                    المحادثات محفوظة محلياً في متصفحك فقط.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">روابط مفيدة:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      <a href="https://platform.openai.com/api-keys" target="_blank" className="text-blue-500 hover:underline">
                        OpenAI API Keys
                      </a>
                    </li>
                    <li>
                      <a href="https://makersuite.google.com/app/apikey" target="_blank" className="text-blue-500 hover:underline">
                        Google AI Studio
                      </a>
                    </li>
                    <li>
                      <a href="https://platform.deepseek.com/api_keys" target="_blank" className="text-blue-500 hover:underline">
                        DeepSeek API Keys
                      </a>
                    </li>
                    <li>
                      <a href="https://replicate.com/account/api-tokens" target="_blank" className="text-blue-500 hover:underline">
                        Replicate API Tokens
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}