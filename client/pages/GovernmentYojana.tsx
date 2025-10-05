import React, { useState } from "react";
import { motion } from "framer-motion";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { FloatingTopBar } from "@/components/FloatingTopBar";
import { useSidebar } from "@/contexts/SidebarContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GovernmentHospitalMap } from "@/components/GovernmentHospitalMap";

interface Scheme {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  coverageEn: string;
  coverageHi: string;
  benefitsEn: string[];
  benefitsHi: string[];
  eligibility: string;
  website?: string;
  helpline?: string;
  coverage: string;
}

const schemes: Scheme[] = [
  {
    id: "pmjay",
    nameEn: "PM-JAY (Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana)",
    nameHi: "पीएम-जेएवाई (आयुष्मान भारत – प्रधान मंत्री जन आरोग्य योजना)",
    icon: "🏥",
    coverageEn: "Free health coverage up to ₹5 lakh per family per year",
    coverageHi: "परिवार को प्रति वर्ष ₹5 लाख तक का मुफ़्त इलाज",
    benefitsEn: [
      "Cashless and paperless treatment in empanelled hospitals across India",
      "Covers pre-existing diseases",
      "Includes pre and post hospitalization expenses (3 days before, 15 days after)",
      "No restriction on family size, age or gender",
      "Portability: benefits available in any empanelled hospital across the country"
    ],
    benefitsHi: [
      "कैशलेस और पेपरलेस इलाज — अस्पताल में पैसे देने की ज़रूरत नहीं",
      "पहले से मौजूद बीमारियाँ (मधुमेह, हृदय रोग) भी शामिल",
      "भर्ती से 3 दिन पहले और 15 दिन बाद तक का खर्च शामिल",
      "परिवार के सदस्यों की संख्या, आयु या लिंग पर कोई सीमा नहीं",
      "देशभर के Empanelled Hospitals में इलाज मिल सकता है"
    ],
    eligibility: "Socio-Economic Caste Census (SECC) eligible families",
    website: "https://nha.gov.in/PM-JAY",
    helpline: "14555",
    coverage: "Implemented in almost all states"
  },
  {
    id: "rsby",
    nameEn: "Rashtriya Swasthya Bima Yojana (RSBY)",
    nameHi: "राष्ट्रीय स्वास्थ्य बीमा योजना (आरएसबीवाई)",
    icon: "💳",
    coverageEn: "Health insurance scheme for Below Poverty Line (BPL) families",
    coverageHi: "गरीब परिवारों (BPL) के लिए स्वास्थ्य बीमा योजना",
    benefitsEn: [
      "Coverage up to ₹30,000 per year for inpatient care",
      "Smart card based cashless service",
      "Covers hospitalization expenses in empanelled hospitals"
    ],
    benefitsHi: [
      "प्रति परिवार ₹30,000 तक का इलाज कवर",
      "स्मार्ट कार्ड से पहचान और नकद रहित सेवा",
      "पंजीकृत अस्पतालों में भर्ती खर्च कवर"
    ],
    eligibility: "Below Poverty Line (BPL) families",
    coverage: "Earlier widely implemented, now merged with PM-JAY in many states"
  },
  {
    id: "nmhp",
    nameEn: "National Mental Health Programme (NMHP) / Tele-MANAS",
    nameHi: "राष्ट्रीय मानसिक स्वास्थ्य कार्यक्रम / टेली-मानस",
    icon: "🧠",
    coverageEn: "Integrates mental health services into general healthcare",
    coverageHi: "मानसिक स्वास्थ्य सेवाओं को सामान्य स्वास्थ्य तंत्र में शामिल करता है",
    benefitsEn: [
      "District Mental Health Programme (DMHP) centers in every district",
      "Tele-MANAS: 24x7 free mental health helpline for counselling",
      "Addresses depression, anxiety, psychosis, addiction"
    ],
    benefitsHi: [
      "हर ज़िले में DMHP केंद्र",
      "Tele-MANAS हेल्पलाइन — मुफ्त परामर्श, 24x7 उपलब्ध",
      "अवसाद, चिंता, नशा, मनोविकार जैसी समस्याओं के लिए"
    ],
    eligibility: "All citizens",
    helpline: "14416",
    coverage: "Nationwide, implemented via states and districts"
  },
  {
    id: "manodarpan",
    nameEn: "Manodarpan (by Ministry of Education)",
    nameHi: "मनोदर्पण (शिक्षा मंत्रालय द्वारा)",
    icon: "📞",
    coverageEn: "Psychological support for students, parents, teachers",
    coverageHi: "छात्रों, अभिभावकों और शिक्षकों के लिए मनोवैज्ञानिक सहयोग",
    benefitsEn: [
      "Online counselling for stress, anxiety, exam pressure",
      "Awareness programs and workshops"
    ],
    benefitsHi: [
      "तनाव, चिंता और परीक्षा दबाव के लिए मुफ्त ऑनलाइन परामर्श",
      "जागरूकता कार्यक्रम और वर्कशॉप"
    ],
    eligibility: "Students, Parents, Teachers",
    website: "https://manodarpan.education.gov.in",
    coverage: "Pan-India (schools, colleges, online portal)"
  },
  {
    id: "eraktkosh",
    nameEn: "e-RaktKosh (Digital Blood Bank)",
    nameHi: "ई-रक्तकोश (डिजिटल रक्त बैंक)",
    icon: "🩸",
    coverageEn: "Real-time availability of blood across India",
    coverageHi: "रक्त उपलब्धता की वास्तविक समय जानकारी",
    benefitsEn: [
      "Search nearest blood bank by state/district",
      "Donor registration and tracking",
      "Transparency in blood stock management"
    ],
    benefitsHi: [
      "राज्य/ज़िला के अनुसार नज़दीकी रक्त बैंक खोजें",
      "रक्तदाता पंजीकरण और ट्रैकिंग",
      "रक्त स्टॉक की पारदर्शी जानकारी"
    ],
    eligibility: "All citizens",
    website: "https://eraktkosh.mohfw.gov.in/",
    coverage: "Available in most states with govt/private blood banks"
  },
  {
    id: "pmbjp",
    nameEn: "PMBJP (Pradhan Mantri Bharatiya Janaushadhi Pariyojana)",
    nameHi: "पीएमबीजेपी (प्रधान मंत्री भारतीय जनऔषधि परियोजना)",
    icon: "💊",
    coverageEn: "Provides quality generic medicines at 50-90% lower cost",
    coverageHi: "जेनेरिक दवाएँ 50-90% कम कीमत पर",
    benefitsEn: [
      "Over 9,500+ Janaushadhi Kendras across India",
      "Covers essential medicines, surgicals, nutraceuticals",
      "Reduces out-of-pocket expenditure"
    ],
    benefitsHi: [
      "पूरे भारत में 9,500+ जन औषधि केंद्र",
      "आवश्यक दवाएँ, सर्जिकल और न्यूट्रास्यूटिकल्स शामिल",
      "जेब से होने वाला खर्च कम"
    ],
    eligibility: "All citizens",
    website: "https://janaushadhi.gov.in/",
    coverage: "All states, with dedicated Janaushadhi Kendras"
  }
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
];

export default function GovernmentYojana() {
  const { isCollapsed } = useSidebar();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedScheme, setSelectedScheme] = useState<string>("");

  const filteredSchemes = selectedScheme && selectedScheme !== "all-schemes"
    ? schemes.filter(scheme => scheme.id === selectedScheme)
    : schemes;

  return (
    <div className="dashboard-page min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <FloatingSidebar isCollapsed={isCollapsed} setIsCollapsed={() => {}} />
      <FloatingTopBar isCollapsed={isCollapsed} />

      <motion.div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-72"} pt-28 p-6`}>
        <header className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {language === 'en' ? '🏛️ Government Health Schemes' : '🏛️ सरकारी स्वास्थ्य योजनाएं'}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Comprehensive information about government healthcare schemes and benefits available across India'
                : 'भारत भर में उपलब्ध सरकारी स्वास्थ्य योजनाओं और लाभों की विस्तृत जानकारी'
              }
            </p>
          </motion.div>
        </header>

        {/* Controls */}
        <motion.div 
          className="mb-8 bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap items-center gap-4">
              {/* Language Toggle */}
              <Button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {language === 'en' ? '🇮🇳 हिंदी में देखें' : '🇬🇧 Switch to English'}
              </Button>

              {/* State Filter */}
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={language === 'en' ? "Select State" : "राज्य चुनें"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-states">
                    {language === 'en' ? "All States" : "सभी राज्य"}
                  </SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Scheme Filter */}
              <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder={language === 'en' ? "Select Scheme" : "योजना चुनें"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-schemes">
                    {language === 'en' ? "All Schemes" : "सभी योजनाएं"}
                  </SelectItem>
                  {schemes.map((scheme) => (
                    <SelectItem key={scheme.id} value={scheme.id}>
                      {scheme.icon} {language === 'en' ? scheme.nameEn : scheme.nameHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://hospitals.pmjay.gov.in/', '_blank')}
              >
                {language === 'en' ? '🏥 Find PM-JAY Hospitals' : '🏥 पीएम-जेएवाई अस्पताल खोजें'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/nearbyBB.cnt', '_blank')}
              >
                {language === 'en' ? '🩸 Find Blood Banks' : '🩸 रक्त बैंक खोजें'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://janaushadhi.gov.in/KendraDetails.aspx', '_blank')}
              >
                {language === 'en' ? '💊 Find Janaushadhi Stores' : '💊 जनऔषधि स्टोर खोजें'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('tel:14416')}
              >
                {language === 'en' ? '📞 Call Tele-MANAS (14416)' : '📞 टेली-मानस कॉल करें (14416)'}
              </Button>
            </div>
          </div>

          {selectedState && selectedState !== "all-states" && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                {language === 'en' 
                  ? `Showing schemes available in ${selectedState}`
                  : `${selectedState} में उपलब्ध योजनाएं दिखाई जा रही हैं`
                }
              </p>
            </div>
          )}
        </motion.div>

        {/* Interactive Service Locator Map */}
        <motion.div 
          className="mb-8 bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🗺️ {language === 'en' ? 'Interactive Service Locator' : 'इंटरैक्टिव सेवा लोकेटर'}
          </h3>
          
          {/* Interactive Leaflet Map */}
          <GovernmentHospitalMap 
            language={language} 
            selectedState={selectedState !== "all-states" ? selectedState : undefined}
          />

          {/* Quick Service Finder */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-4">
              {language === 'en' ? '🎯 Quick Service Finder' : '🎯 त्वरित सेवा खोजकर्ता'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => window.open('https://hospitals.pmjay.gov.in/', '_blank')}
              >
                <div className="text-left">
                  <div className="font-semibold">🏥 {language === 'en' ? 'PM-JAY Hospitals' : 'पीएम-जेएवाई अस्पताल'}</div>
                  <div className="text-xs text-gray-500">
                    {language === 'en' ? 'Find empanelled hospitals for cashless treatment' : 'कैशलेस इलाज के लिए पंजीकृत अस्पताल खोजें'}
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => window.open('https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/nearbyBB.cnt', '_blank')}
              >
                <div className="text-left">
                  <div className="font-semibold">🩸 {language === 'en' ? 'Blood Banks' : 'रक्त बैंक'}</div>
                  <div className="text-xs text-gray-500">
                    {language === 'en' ? 'Check blood availability and find nearest blood bank' : 'रक्त उपलब्धता जांचें और नजदीकी रक्त बैंक खोजें'}
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => window.open('https://janaushadhi.gov.in/KendraDetails.aspx', '_blank')}
              >
                <div className="text-left">
                  <div className="font-semibold">💊 {language === 'en' ? 'Janaushadhi Stores' : 'जनऔषधि स्टोर'}</div>
                  <div className="text-xs text-gray-500">
                    {language === 'en' ? 'Locate generic medicine stores with affordable prices' : 'किफायती दामों पर जेनेरिक दवा स्टोर खोजें'}
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => window.open('https://telemanas.mohfw.gov.in/', '_blank')}
              >
                <div className="text-left">
                  <div className="font-semibold">🧠 {language === 'en' ? 'Mental Health Centers' : 'मानसिक स्वास्थ्य केंद्र'}</div>
                  <div className="text-xs text-gray-500">
                    {language === 'en' ? 'Find district mental health centers and counseling' : 'जिला मानसिक स्वास्थ्य केंद्र और परामर्श खोजें'}
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{scheme.icon}</div>
                      <div>
                        <CardTitle className="text-lg leading-tight">
                          {language === 'en' ? scheme.nameEn : scheme.nameHi}
                        </CardTitle>
                        <CardDescription className="mt-2 font-medium text-blue-600">
                          {language === 'en' ? scheme.coverageEn : scheme.coverageHi}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {scheme.coverage.includes('All states') || scheme.coverage.includes('Nationwide') 
                        ? (language === 'en' ? 'Pan-India' : 'पूरे भारत में')
                        : (language === 'en' ? 'State-wise' : 'राज्य-वार')
                      }
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {language === 'en' ? '✨ Key Benefits:' : '✨ मुख्य लाभ:'}
                    </h4>
                    <ul className="space-y-1">
                      {(language === 'en' ? scheme.benefitsEn : scheme.benefitsHi).map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-medium text-gray-800 mb-1">
                      {language === 'en' ? '👥 Eligibility:' : '👥 पात्रता:'}
                    </h5>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {scheme.website && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(scheme.website, '_blank')}
                      >
                        🌐 {language === 'en' ? 'Official Website' : 'आधिकारिक वेबसाइट'}
                      </Button>
                    )}
                    {scheme.helpline && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`tel:${scheme.helpline}`)}
                      >
                        📞 {scheme.helpline}
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      📋 {language === 'en' ? 'Apply Now' : 'अभी आवेदन करें'}
                    </Button>
                  </div>

                  {/* Coverage Info */}
                  <div className="text-xs text-gray-500 border-t pt-2">
                    <strong>{language === 'en' ? 'Coverage:' : 'कवरेज:'}</strong> {scheme.coverage}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Official Government Resources */}
        <motion.div 
          className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-green-800 mb-4">
            🌐 {language === 'en' ? 'Official Government Resources' : 'आधिकारिक सरकारी संसाधन'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-green-700 mb-2">
                🏛️ {language === 'en' ? 'National Health Authority' : 'राष्ट्रीय स्वास्थ्य प्राधिकरण'}
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://nha.gov.in/', '_blank')}
              >
                {language === 'en' ? 'Visit Portal' : 'पोर्टल देखें'}
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-green-700 mb-2">
                🩺 {language === 'en' ? 'Ministry of Health & Family Welfare' : 'स्वास्थ्य और परिवार कल्याण मंत्रालय'}
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://mohfw.gov.in/', '_blank')}
              >
                {language === 'en' ? 'Visit Portal' : 'पोर्टल देखें'}
              </Button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-green-700 mb-2">
                🏥 {language === 'en' ? 'PM-JAY Hospital Locator' : 'पीएम-जेएवाई अस्पताल लोकेटर'}
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://hospitals.pmjay.gov.in/', '_blank')}
              >
                {language === 'en' ? 'Find Hospitals' : 'अस्पताल खोजें'}
              </Button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-green-700 mb-2">
                🩸 {language === 'en' ? 'e-RaktKosh Blood Bank' : 'ई-रक्तकोश रक्त बैंक'}
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://eraktkosh.mohfw.gov.in/', '_blank')}
              >
                {language === 'en' ? 'Check Availability' : 'उपलब्धता जांचें'}
              </Button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-green-700 mb-2">
                💊 {language === 'en' ? 'Janaushadhi Store Locator' : 'जनऔषधि स्टोर लोकेटर'}
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://janaushadhi.gov.in/KendraDetails.aspx', '_blank')}
              >
                {language === 'en' ? 'Find Stores' : 'स्टोर खोजें'}
              </Button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-green-700 mb-2">
                🧠 {language === 'en' ? 'Tele-MANAS Portal' : 'टेली-मानस पोर्टल'}
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://telemanas.mohfw.gov.in/', '_blank')}
              >
                {language === 'en' ? 'Get Support' : 'सहायता पाएं'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Emergency Helplines */}
        <motion.div 
          className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-red-800 mb-4">
            🚨 {language === 'en' ? 'Emergency Helplines' : 'आपातकालीन हेल्पलाइन'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-red-700 mb-1">
                {language === 'en' ? 'Medical Emergency' : 'चिकित्सा आपातकाल'}
              </div>
              <div className="text-2xl font-bold text-red-600 mb-2">108</div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('tel:108')}
              >
                {language === 'en' ? 'Call Now' : 'अभी कॉल करें'}
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-red-700 mb-1">
                {language === 'en' ? 'Mental Health (Tele-MANAS)' : 'मानसिक स्वास्थ्य (टेली-मानस)'}
              </div>
              <div className="text-2xl font-bold text-red-600 mb-2">14416</div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('tel:14416')}
              >
                {language === 'en' ? 'Call Now' : 'अभी कॉल करें'}
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-red-700 mb-1">
                {language === 'en' ? 'PM-JAY Helpline' : 'पीएम-जेएवाई हेल्पलाइन'}
              </div>
              <div className="text-2xl font-bold text-red-600 mb-2">14555</div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('tel:14555')}
              >
                {language === 'en' ? 'Call Now' : 'अभी कॉल करें'}
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
              <div className="font-semibold text-red-700 mb-1">
                {language === 'en' ? 'COVID-19 Helpline' : 'कोविड-19 हेल्पलाइन'}
              </div>
              <div className="text-2xl font-bold text-red-600 mb-2">1075</div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('tel:1075')}
              >
                {language === 'en' ? 'Call Now' : 'अभी कॉल करें'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          className="mt-8 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm">
            {language === 'en' 
              ? '💡 For the most up-to-date information, please visit the official government websites or contact the respective helplines.'
              : '💡 नवीनतम जानकारी के लिए, कृपया आधिकारिक सरकारी वेबसाइटों पर जाएं या संबंधित हेल्पलाइन से संपर्क करें।'
            }
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
