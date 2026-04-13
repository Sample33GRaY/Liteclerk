import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

type LanguageCode = 'en' | 'tl' | 'ceb';

interface LocalizedText {
  en: string;
  tl: string;
  ceb: string;
}

interface ChatQuestion {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

interface QuestionCategory {
  id: string;
  label: LocalizedText;
  questions: ChatQuestion[];
}

interface QuickOption {
  id: string;
  label: string;
}

interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
}

@Component({
  selector: 'app-faq-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-chat.html',
  styleUrl: './faq-chat.css',
})
export class FaqChatComponent {
  @ViewChild('messagesContainer') private messagesContainer?: ElementRef<HTMLDivElement>;

  isOpen = false;
  selectedLanguage: LanguageCode = 'en';
  readonly initialOptionLimit = 6;
  visibleRegularOptionLimit = this.initialOptionLimit;
  mode: 'general' | 'category-menu' | 'category-questions' = 'general';
  activeCategoryId: string | null = null;
  readonly askedGeneralQuestionIds = new Set<string>();
  readonly askedCategoryQuestionIds = new Map<string, Set<string>>();
  messages: ChatMessage[] = [
    {
      role: 'assistant',
      text: 'Hi! This is Liteclerk Assistant. Choose a question below for a quick answer.',
    },
  ];

  readonly languageOptions: Array<{ code: LanguageCode; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'tl', label: 'Tagalog' },
    { code: 'ceb', label: 'Bisaya' },
  ];

  readonly generalQuestions: ChatQuestion[] = [
    {
      id: 'liteclerk-system',
      question: {
        en: 'What is the Liteclerk system?',
        tl: 'Ano ang Liteclerk na sistema?',
        ceb: 'Unsa ang Liteclerk nga sistema?',
      },
      answer: {
        en: 'Liteclerk is a software solutions provider offering POS, Accounting, Payroll, and other business systems designed to simplify daily operations. Each system is offered per product and quotation, depending on your business needs.',
        tl: 'Ang Liteclerk ay provider ng software solutions na nag-aalok ng POS, Accounting, Payroll, at iba pang mga sistemang pang-negosyo para mapadali ang pang-araw-araw na operasyon. Ang bawat sistema ay inaalok kada produkto at may kasamang angkop na quotation, depende sa pangangailangan ng inyong negosyo.',
        ceb: 'Ang Liteclerk usa ka provider sa software solutions nga naghatag og POS, Accounting, Payroll, ug uban pang mga sistemang pangnegosyo aron mas mapadali ang adlaw-adlaw nga operasyon. Ang matag sistema ihalad kada produkto ug naay tukmang quotation, depende sa panginahanglan sa inyong negosyo.',
      },
    },
    {
      id: 'all-in-one',
      question: {
        en: 'Is this an all-in-one system?',
        tl: 'All-in-one na sistema ba ito?',
        ceb: 'All-in-one nga sistema ba kini?',
      },
      answer: {
        en: 'Not bundled by default. Each system is offered separately, but we can integrate them (for example, POS + Cloud Accounting) for centralized monitoring and reporting.',
        tl: 'Hindi ito naka-bundle bilang default. Bawat sistema ay inaalok nang hiwalay, pero puwede natin silang i-integrate (halimbawa, POS + Cloud Accounting) para sa sentralisadong monitoring at reporting.',
        ceb: 'Dili kini naka-bundle isip default. Ang matag sistema ihalad nga bulag, apan pwede nato silang i-integrate (pananglitan, POS + Cloud Accounting) para sa sentralisadong monitoring ug reporting.',
      },
    },
    {
      id: 'business-fit',
      question: {
        en: 'Can this work for my business?',
        tl: 'Puwede ba ito sa negosyo ko?',
        ceb: 'Pwede ba kini sa akong negosyo?',
      },
      answer: {
        en: 'Yes. Liteclerk is flexible and can be configured for retail, restaurant, and other business types.',
        tl: 'Oo. Flexible ang Liteclerk at puwedeng i-configure para sa retail, restaurant, at iba pang uri ng negosyo.',
        ceb: 'Oo. Flexible ang Liteclerk ug mahimong i-configure para sa retail, restaurant, ug uban pang matang sa negosyo.',
      },
    },
    {
      id: 'bir-accredited',
      question: {
        en: 'Is Liteclerk BIR accredited?',
        tl: 'BIR accredited ba ang Liteclerk na sistema?',
        ceb: 'BIR accredited ba ang Liteclerk nga sistema?',
      },
      answer: {
        en: 'Yes. Liteclerk POS is BIR accredited, and we also assist with registration and the PTU process.',
        tl: 'Oo. Ang Liteclerk POS ay BIR accredited, at tumutulong din kami sa pagpaparehistro at proseso ng PTU.',
        ceb: 'Oo. Ang Liteclerk POS kay BIR accredited, ug motabang pud mi sa pagparehistro ug proseso sa PTU.',
      },
    },
  ];

  readonly categories: QuestionCategory[] = [
    {
      id: 'pos-system',
      label: this.tr('POS System (Desktop)', 'POS System (Desktop)', 'POS System (Desktop)'),
      questions: [
        {
          id: 'pos-features',
          question: this.tr('Unsa features sa POS?', 'What features does the POS have?', 'Ano ang features ng POS?'),
          answer: this.tr(
            'Ang Liteclerk POS kay designed para sa adlaw-adlaw nga sales operations uban sa features sama sa sales processing, inventory tracking, reporting, ug user access control para mas maayos ug efficient ang inyong business operations.',
            'The Liteclerk POS is designed for daily sales operations with features like sales processing, inventory tracking, reporting, and user access control to keep your business operations organized and efficient.',
            'Ang Liteclerk POS ay designed para sa araw-araw na sales operations na may features tulad ng sales processing, inventory tracking, reporting, at user access control para mas maayos at efficient ang inyong business operations.',
          ),
        },
        {
          id: 'pos-multi-cashier',
          question: this.tr('Pwede multi-cashier / multi-terminal?', 'Can it support multi-cashier / multi-terminal?', 'Pwede ba multi-cashier / multi-terminal?'),
          answer: this.tr(
            'Yes po, supported ang multi-cashier ug multi-terminal setup depende sa inyong business requirement ug store configuration.',
            'Yes, multi-cashier and multi-terminal setup is supported depending on your business requirements and store configuration.',
            'Yes po, supported ang multi-cashier at multi-terminal setup depende sa inyong business requirement at store configuration.',
          ),
        },
        {
          id: 'pos-inventory-tracking',
          question: this.tr('Naay inventory tracking?', 'Does it have inventory tracking?', 'May inventory tracking ba?'),
          answer: this.tr(
            'Yes po, naa kay real-time inventory monitoring ug tracking features para updated ka sa stock movement sa inyong business.',
            'Yes, it has real-time inventory monitoring and tracking so you stay updated on stock movement in your business.',
            'Yes po, may real-time inventory monitoring at tracking features para updated kayo sa stock movement ng inyong business.',
          ),
        },
        {
          id: 'pos-sales-reports',
          question: this.tr('Naay sales reports?', 'Are sales reports available?', 'May sales reports ba?'),
          answer: this.tr(
            'Yes po, available ang detailed ug summary sales reports para mas dali ninyo ma-monitor ang performance sa inyong business.',
            'Yes, detailed and summary sales reports are available so you can monitor your business performance more easily.',
            'Yes po, available ang detailed at summary sales reports para mas madali ninyong ma-monitor ang performance ng inyong business.',
          ),
        },
        {
          id: 'pos-internet',
          question: this.tr('Kailangan ba internet always?', 'Is internet always required?', 'Kailangan ba laging may internet?'),
          answer: this.tr(
            'Dili po required ang internet para sa standalone POS operation. Pero recommended kini kung gusto ka ug cloud integration para sa real-time access ug monitoring anytime, anywhere.',
            'Internet is not required for standalone POS operations. However, it is recommended if you want cloud integration for real-time access and monitoring anytime, anywhere.',
            'Hindi po required ang internet para sa standalone POS operation. Pero recommended ito kung gusto ninyo ng cloud integration for real-time access at monitoring anytime, anywhere.',
          ),
        },
        {
          id: 'pos-accounting-integration',
          question: this.tr('Pwede ma integrate sa accounting system?', 'Can it be integrated with an accounting system?', 'Pwede ba i-integrate sa accounting system?'),
          answer: this.tr(
            'Yes po, integration-ready ang POS with Liteclerk Cloud Accounting para sa automatic posting ug centralized reporting.',
            'Yes, the POS is integration-ready with Liteclerk Cloud Accounting for automatic posting and centralized reporting.',
            'Yes po, integration-ready ang POS with Liteclerk Cloud Accounting para sa automatic posting at centralized reporting.',
          ),
        },
        {
          id: 'pos-hardware-needed',
          question: this.tr('Unsa hardware needed?', 'What hardware is needed?', 'Anong hardware ang kailangan?'),
          answer: this.tr(
            'Kasagaran naglakip ug computer unit, POS printer, cash drawer, ug barcode scanner depende sa inyong setup ug business needs.',
            'Typically, this includes a computer unit, POS printer, cash drawer, and barcode scanner depending on your setup and business needs.',
            'Karaniwang kasama ang computer unit, POS printer, cash drawer, at barcode scanner depende sa inyong setup at business needs.',
          ),
        },
        {
          id: 'pos-hardware-included',
          question: this.tr('Included ba hardware sa package?', 'Is hardware included in the package?', 'Kasama ba ang hardware sa package?'),
          answer: this.tr(
            'Optional po, pwede siya i-bundle with hardware or software-only package depende sa inyong preference ug quotation.',
            'It is optional. You can get a bundled hardware package or a software-only package depending on your preference and quotation.',
            'Optional po, puwede siyang bundled with hardware or software-only package depende sa inyong preference at quotation.',
          ),
        },
        {
          id: 'pos-low-stock',
          question: this.tr('Naa bay feature nga ma-determine if hapit na mahurot ang stocks?', 'Is there a feature to detect if stocks are running low?', 'May feature ba para malaman kung paubos na ang stocks?'),
          answer: this.tr(
            'Yes po, ang system naa stock monitoring ug reporting features nga makatabang nimo ma-identify ang low stock levels. Once logged in, dali ra nimo makita ang inventory status, ug among system implementer motudlo ug mo-train sa proper setup sa stock alerts para mas maayo ang inventory control ug planning.',
            'Yes, the system has stock monitoring and reporting features that help you identify low stock levels. Once logged in, you can easily view inventory status, and our system implementer will guide and train you on proper stock alert setup for better inventory control and planning.',
            'Yes po, ang system may stock monitoring at reporting features na tumutulong para ma-identify ang low stock levels. Once logged in, madali ninyong makita ang inventory status, at ang system implementer namin ang magga-guide at magta-train sa proper setup ng stock alerts para sa better inventory control at planning.',
          ),
        },
        {
          id: 'pos-expiry-report',
          question: this.tr('Naa ba expiry report for inventorable items?', 'Is there an expiry report for inventorable items?', 'May expiry report ba para sa inventorable items?'),
          answer: this.tr(
            'Yes po, ang system maka-generate ug expiry reports para sa inventory items nga naay expiration dates. Kini makatabang sa sakto nga stock monitoring ug paglikay sa losses tungod sa expired products.',
            'Yes, the system can generate expiry reports for inventory items with expiration dates. This helps you monitor stock properly and avoid losses due to expired products.',
            'Yes po, ang system can generate expiry reports para sa inventory items na may expiration dates. Makakatulong ito para ma-monitor nang maayos ang stock at maiwasan ang losses dahil sa expired products.',
          ),
        },
        {
          id: 'pos-audit-trail',
          question: this.tr('Ma-track ba ang user logs/history like updates or deletions?', 'Can user logs/history like updates or deletions be tracked?', 'Ma-track ba ang user logs/history tulad ng updates o deletions?'),
          answer: this.tr(
            'Yes po, ang system naa audit trail feature diin ma-track nimo ang user activities sama sa updates, deletions, ug uban pang transactions. Kini naghatag ug transparency, accountability, ug mas maayong control sa inyong business operations.',
            'Yes, the system has an audit trail feature where you can track user activities such as updates, deletions, and other transactions. This ensures transparency, accountability, and better control over business operations.',
            'Yes po, ang system may audit trail feature kung saan ma-ta-track ninyo ang user activities tulad ng updates, deletions, at iba pang transactions. Ito ay para sa transparency, accountability, at better control sa business operations.',
          ),
        },
        {
          id: 'pos-multiple-paytypes',
          question: this.tr('Pwede ba ang POS for multiple paytype in one transaction?', 'Can POS handle multiple payment types in one transaction?', 'Pwede ba ang POS para sa multiple paytypes in one transaction?'),
          answer: this.tr(
            'Yes po, supported ang multiple payment types in a single transaction. Pwede pud ka mag-add ug remarks or notes per transaction para sa mas maayo nga recording ug documentation sa sales history.',
            'Yes, multiple payment types are supported in a single transaction. You can also add remarks or notes per transaction for better recording and documentation of sales history.',
            'Yes po, supported ang multiple payment types in a single transaction. Puwede rin mag-add ng remarks or notes per transaction para sa better recording at documentation ng sales history.',
          ),
        },
        {
          id: 'pos-merge-split',
          question: this.tr('Pwede ba ang POS for merge and split transaction for restaurant process?', 'Can POS do merge and split transactions for restaurant processes?', 'Pwede ba ang POS for merge and split transaction para sa restaurant process?'),
          answer: this.tr(
            'Yes po, available ang merge ug split transaction feature labi na useful sa restaurant operations. Kini naghatag ug flexibility sa pag-manage sa orders ug tables. Proper setup himuon during implementation, ug among system implementer mo-guide ug mo-train sa inyong staff para sa sakto nga paggamit.',
            'Yes, the merge and split transaction feature is available and is especially useful for restaurant operations. It gives flexibility in managing orders and tables. Proper setup is done during implementation, and our system implementer will guide and train your staff on correct usage.',
            'Yes po, available ang merge at split transaction feature lalo na para sa restaurant operations. Nagbibigay ito ng flexibility sa pag-manage ng orders at tables. Proper setup is done during implementation, at ang system implementer namin ang magga-guide at magta-train sa staff ninyo para sa tamang paggamit.',
          ),
        },
      ],
    },
    {
      id: 'cloud-accounting',
      label: this.tr('Cloud Accounting System', 'Cloud Accounting System', 'Cloud Accounting System'),
      questions: [
        {
          id: 'acc-features',
          question: this.tr('Unsa features sa accounting system?', 'What features does the accounting system have?', 'Ano ang features ng accounting system?'),
          answer: this.tr(
            'Ang Liteclerk Cloud Accounting system motabang nimo sa pag-manage sa financial records, reports, ug business transactions para mas organized ug accurate ang inyong accounting process.',
            'The Liteclerk Cloud Accounting system helps you manage financial records, reports, and business transactions for a more organized and accurate accounting process.',
            'Ang Liteclerk Cloud Accounting system ay tumutulong sa pag-manage ng financial records, reports, at business transactions para mas organized at accurate ang accounting process ninyo.',
          ),
        },
        {
          id: 'acc-auto-posting-pos',
          question: this.tr('Automatic posting ba from POS?', 'Is automatic posting from POS available?', 'May automatic posting ba from POS?'),
          answer: this.tr(
            'Yes po, pwede ma-integrate ang POS para automatic posting sa sales transactions ngadto sa accounting system para mas paspas ug accurate nga reporting.',
            'Yes, POS can be integrated for automatic posting of sales transactions into the accounting system for faster and more accurate reporting.',
            'Yes po, puwedeng ma-integrate ang POS para automatic posting ng sales transactions papunta sa accounting system for faster and more accurate reporting.',
          ),
        },
        {
          id: 'acc-financial-reports',
          question: this.tr('Naay financial reports?', 'Are financial reports available?', 'May financial reports ba?'),
          answer: this.tr(
            'Yes po, apil ang key financial reports sama sa Income Statement, Balance Sheet, ug Cash Flow para sa mas maayong financial monitoring.',
            'Yes, key financial reports are included, such as Income Statement, Balance Sheet, and Cash Flow for better financial monitoring.',
            'Yes po, kasama ang key financial reports tulad ng Income Statement, Balance Sheet, at Cash Flow para sa better financial monitoring.',
          ),
        },
        {
          id: 'acc-multi-company',
          question: this.tr('Pwede multi-company?', 'Can it support multi-company?', 'Pwede ba multi-company?'),
          answer: this.tr(
            'Yes po, supported ang multiple companies ug branches para sa centralized accounting management. Pero naa mahimong additional charges per company or branch depende sa setup ug requirements. Kung gusto nimo, pwede mi mag-prepare ug detailed quotation para ninyo.',
            'Yes, multiple companies and branches are supported for centralized accounting management. However, additional charges may apply per company or branch depending on setup and requirements. We can prepare a detailed quotation for you.',
            'Yes po, supported ang multiple companies at branches para sa centralized accounting management. Pero maaaring may additional charges per company or branch depende sa setup at requirements. Puwede kaming mag-prepare ng detailed quotation para sa inyo.',
          ),
        },
        {
          id: 'acc-anytime-access',
          question: this.tr('Accessible anytime anywhere?', 'Is it accessible anytime, anywhere?', 'Accessible ba anytime, anywhere?'),
          answer: this.tr(
            'Yes po, cloud-based ang system mao nga ma-access nimo ang inyong accounting data anytime ug anywhere basta naa kay internet connection.',
            'Yes, the system is cloud-based, so you can access your accounting data anytime and anywhere with an internet connection.',
            'Yes po, cloud-based ang system kaya ma-aaccess ninyo ang accounting data anytime at anywhere basta may internet connection.',
          ),
        },
        {
          id: 'acc-bir-compliant',
          question: this.tr('BIR compliant ba?', 'Is it BIR compliant?', 'BIR compliant ba ito?'),
          answer: this.tr(
            'Yes po, ang system designed para mosuporta sa standard accounting reports nga aligned sa BIR requirements.',
            'Yes, the system is designed to support standard accounting reports aligned with BIR requirements.',
            'Yes po, ang system ay designed para suportahan ang standard accounting reports na aligned sa BIR requirements.',
          ),
        },
        {
          id: 'acc-import-data',
          question: this.tr('Pwede mag import data?', 'Can data be imported?', 'Pwede ba mag-import ng data?'),
          answer: this.tr(
            'Yes po, maka-assist mi sa data migration depende sa inyong existing records ug system setup.',
            'Yes, we can assist with data migration depending on your existing records and system setup.',
            'Yes po, puwede kaming tumulong sa data migration depende sa inyong existing records at system setup.',
          ),
        },
        {
          id: 'acc-audit-trail',
          question: this.tr('Naay audit trail?', 'Does it have an audit trail?', 'May audit trail ba?'),
          answer: this.tr(
            'Yes po, ang system naa audit trail features para ma-track nimo ang changes ug user activities para sa transparency ug control.',
            'Yes, the system includes audit trail features so you can track changes and user activities for transparency and control.',
            'Yes po, may audit trail features ang system para ma-track ang changes at user activities for transparency and control.',
          ),
        },
        {
          id: 'acc-pos-integration',
          question: this.tr('Pwede ma integrate sa POS?', 'Can it be integrated with POS?', 'Pwede ba i-integrate sa POS?'),
          answer: this.tr(
            'Yes po, fully integration-ready ang accounting system with Liteclerk POS para sa centralized business monitoring.',
            'Yes, the accounting system is fully integration-ready with Liteclerk POS for centralized business monitoring.',
            'Yes po, fully integration-ready ang accounting system with Liteclerk POS para sa centralized business monitoring.',
          ),
        },
        {
          id: 'acc-data-security',
          question: this.tr('Safe ba ang data?', 'Is the data safe?', 'Safe ba ang data?'),
          answer: this.tr(
            'Yes po, inyong data kay securely stored sa cloud uban sa proper access control ug system protection measures.',
            'Yes, your data is securely stored in the cloud with proper access control and system protection measures.',
            'Yes po, securely stored ang data ninyo sa cloud with proper access control at system protection measures.',
          ),
        },
      ],
    },
    {
      id: 'cloud-payroll',
      label: this.tr('Cloud Payroll System', 'Cloud Payroll System', 'Cloud Payroll System'),
      questions: [
        {
          id: 'pay-features',
          question: this.tr('Unsa features sa payroll system?', 'What features does the payroll system have?', 'Ano ang features ng payroll system?'),
          answer: this.tr(
            'Ang Liteclerk Cloud Payroll system motabang nimo sa pag-manage sa employee payroll processing, attendance, ug government deductions para mas accurate ug organized ang inyong payroll process.',
            'The Liteclerk Cloud Payroll system helps you manage employee payroll processing, attendance, and government deductions for a more accurate and organized payroll process.',
            'Ang Liteclerk Cloud Payroll system ay tumutulong sa pag-manage ng employee payroll processing, attendance, at government deductions para mas accurate at organized ang payroll process ninyo.',
          ),
        },
        {
          id: 'pay-auto-compute',
          question: this.tr('Automatic salary computation ba?', 'Is salary computation automatic?', 'Automatic ba ang salary computation?'),
          answer: this.tr(
            'Yes po, ang system automatic mo-compute sa salaries apil ang overtime, allowances, ug deductions base sa inyong configured payroll rules.',
            'Yes, the system automatically computes salaries including overtime, allowances, and deductions based on your configured payroll rules.',
            'Yes po, automatic na kino-compute ng system ang salaries including overtime, allowances, at deductions based on your configured payroll rules.',
          ),
        },
        {
          id: 'pay-government-deductions',
          question: this.tr('Naay SSS, PhilHealth, Pag-IBIG deductions?', 'Are SSS, PhilHealth, and Pag-IBIG deductions supported?', 'May SSS, PhilHealth, at Pag-IBIG deductions ba?'),
          answer: this.tr(
            'Yes po, supported ang automatic computation sa government contributions sama sa SSS, PhilHealth, ug Pag-IBIG.',
            'Yes, automatic computation of government contributions such as SSS, PhilHealth, and Pag-IBIG is supported.',
            'Yes po, supported ang automatic computation ng government contributions tulad ng SSS, PhilHealth, at Pag-IBIG.',
          ),
        },
        {
          id: 'pay-payslip',
          question: this.tr('Pwede generate payslip?', 'Can it generate payslips?', 'Pwede ba mag-generate ng payslip?'),
          answer: this.tr(
            'Yes po, ang system maka-generate ug mo-provide ug digital payslips para sa employees.',
            'Yes, the system can generate and provide digital payslips for employees.',
            'Yes po, ang system can generate at provide digital payslips for employees.',
          ),
        },
        {
          id: 'pay-anytime-access',
          question: this.tr('Accessible anytime anywhere?', 'Is it accessible anytime, anywhere?', 'Accessible ba anytime, anywhere?'),
          answer: this.tr(
            'Yes po, cloud-based ang payroll system mao nga ma-access nimo kini anytime ug anywhere with internet connection.',
            'Yes, the payroll system is cloud-based so you can access it anytime and anywhere with an internet connection.',
            'Yes po, cloud-based ang payroll system kaya ma-aaccess ito anytime at anywhere with internet connection.',
          ),
        },
        {
          id: 'pay-attendance-integration',
          question: this.tr('Naay attendance integration?', 'Is attendance integration available?', 'May attendance integration ba?'),
          answer: this.tr(
            'Yes po, pwede ma-integrate with biometric devices or attendance systems depende sa inyong setup.',
            'Yes, it can be integrated with biometric devices or attendance systems depending on your setup.',
            'Yes po, puwedeng ma-integrate with biometric devices or attendance systems depende sa inyong setup.',
          ),
        },
        {
          id: 'pay-custom-setup',
          question: this.tr('Pwede customized payroll setup?', 'Can payroll setup be customized?', 'Pwede ba customized payroll setup?'),
          answer: this.tr(
            'Yes po, pwede ma-configure ang payroll rules base sa inyong company policies ug requirements.',
            'Yes, payroll rules can be configured based on your company policies and requirements.',
            'Yes po, puwedeng i-configure ang payroll rules base sa company policies at requirements ninyo.',
          ),
        },
        {
          id: 'pay-employee-portal',
          question: this.tr('Naay employee portal?', 'Is there an employee portal?', 'May employee portal ba?'),
          answer: this.tr(
            'Yes po, ang employees maka-access sa ilang payslips ug payroll records through a secure portal or mobile access depende sa setup.',
            'Yes, employees can access their payslips and payroll records through a secure portal or mobile access depending on setup.',
            'Yes po, puwedeng ma-access ng employees ang payslips at payroll records nila through a secure portal or mobile access depende sa setup.',
          ),
        },
        {
          id: 'pay-data-security',
          question: this.tr('Safe ba ang data?', 'Is the data safe?', 'Safe ba ang data?'),
          answer: this.tr(
            'Yes po, secured ang data with proper access control ug cloud protection para maseguro ang confidentiality sa employee records.',
            'Yes, data is secured with proper access control and cloud protection to ensure confidentiality of employee records.',
            'Yes po, secured ang data with proper access control at cloud protection para masiguro ang confidentiality ng employee records.',
          ),
        },
        {
          id: 'pay-multi-company',
          question: this.tr('Pwede multi-company?', 'Can it support multi-company payroll?', 'Pwede ba multi-company?'),
          answer: this.tr(
            'Yes po, supported ang multi-company payroll setup depende sa inyong requirements. Additional charges mahimong mo-apply per company or branch, ug pwede mi mag-prepare ug quotation kung needed.',
            'Yes, multi-company payroll setup is supported depending on your requirements. Additional charges may apply per company or branch, and we can prepare a quotation if needed.',
            'Yes po, supported ang multi-company payroll setup depende sa inyong requirements. Additional charges may apply per company or branch, at puwede kaming mag-prepare ng quotation kung needed.',
          ),
        },
      ],
    },
    {
      id: 'customization',
      label: this.tr('Customization / System Modification', 'Customization / System Modification', 'Customization / System Modification'),
      questions: [
        {
          id: 'custom-system-customizable',
          question: this.tr('Pwede ba ma-customize ang system?', 'Can the system be customized?', 'Pwede ba ma-customize ang system?'),
          answer: this.tr(
            'Yes po, ang Liteclerk mosuporta ug system customization depende sa inyong business needs ug workflow requirements.',
            'Yes, Liteclerk supports system customization depending on your business needs and workflow requirements.',
            'Yes po, sinusuportahan ng Liteclerk ang system customization depende sa business needs at workflow requirements ninyo.',
          ),
        },
        {
          id: 'custom-add-features',
          question: this.tr('Pwede mag-add ng new features?', 'Can new features be added?', 'Pwede ba mag-add ng new features?'),
          answer: this.tr(
            'Yes po, additional features pwede i-develop base sa agreed scope ug requirements. Amo kining i-review ug mohatag ug proper quotation before development.',
            'Yes, additional features can be developed based on the agreed scope and requirements. We will review and provide a proper quotation before development.',
            'Yes po, puwedeng i-develop ang additional features base sa agreed scope at requirements. Ire-review muna namin at magbibigay ng proper quotation before development.',
          ),
        },
        {
          id: 'custom-reports',
          question: this.tr('Pwede i-customize ang reports?', 'Can reports be customized?', 'Pwede ba i-customize ang reports?'),
          answer: this.tr(
            'Yes po, pwede ma-adjust or ma-create ang reports base sa inyong required business format ug reporting needs.',
            'Yes, reports can be adjusted or created based on your required business format and reporting needs.',
            'Yes po, puwedeng ma-adjust o ma-create ang reports base sa required business format at reporting needs ninyo.',
          ),
        },
        {
          id: 'custom-receipt-invoice',
          question: this.tr('Pwede i-customize ang receipt / invoice format?', 'Can receipt / invoice format be customized?', 'Pwede ba i-customize ang receipt / invoice format?'),
          answer: this.tr(
            'Yes po, receipt ug invoice layout pwede ma-customize depende sa inyong branding ug requirements.',
            'Yes, receipt and invoice layout can be customized depending on your branding and requirements.',
            'Yes po, puwedeng i-customize ang receipt at invoice layout depende sa branding at requirements ninyo.',
          ),
        },
        {
          id: 'custom-additional-cost',
          question: this.tr('May additional cost ba ang customization?', 'Does customization have additional cost?', 'May additional cost ba ang customization?'),
          answer: this.tr(
            'Yes po, ang customization kay quoted separately depende sa scope, complexity, ug required development work.',
            'Yes, customization is quoted separately depending on the scope, complexity, and required development work.',
            'Yes po, ang customization ay quoted separately depende sa scope, complexity, at required development work.',
          ),
        },
        {
          id: 'custom-timeline',
          question: this.tr('Gaano katagal ang customization?', 'How long does customization take?', 'Gaano katagal ang customization?'),
          answer: this.tr(
            'Ang timeline depende sa complexity sa request. Ang simple changes pwede muabot ug pila ka adlaw, samtang ang dako nga features mas dugay.',
            'Timeline depends on the complexity of the request. Simple changes may take a few days, while larger features may take longer.',
            'Ang timeline ay depende sa complexity ng request. Ang simple changes puwedeng tumagal ng ilang araw, habang ang larger features ay mas matagal.',
          ),
        },
        {
          id: 'custom-process',
          question: this.tr('How is customization processed?', 'How is customization processed?', 'Paano pinoproseso ang customization?'),
          answer: this.tr(
            'Tanang customization requests kay properly documented, reviewed, ug quoted before implementation para masiguro ang clear agreement ug proper system delivery.',
            'All customization requests are properly documented, reviewed, and quoted before implementation to ensure clear agreement and proper system delivery.',
            'Lahat ng customization requests ay properly documented, reviewed, at quoted bago implementation para masigurong clear ang agreement at proper ang system delivery.',
          ),
        },
        {
          id: 'custom-request-anytime',
          question: this.tr('Pwede ba i-request anytime ang changes?', 'Can changes be requested anytime?', 'Pwede bang i-request anytime ang changes?'),
          answer: this.tr(
            'Yes po, pwede ka mo-request anytime, pero subject gihapon sa evaluation ug quotation before approval ug development.',
            'Yes, you may request changes anytime, but requests are subject to evaluation and quotation before approval and development.',
            'Yes po, puwede kayong mag-request anytime, pero subject pa rin sa evaluation at quotation before approval and development.',
          ),
        },
      ],
    },
    {
      id: 'pricing-packages',
      label: this.tr('Pricing & Packages', 'Pricing & Packages', 'Pricing & Packages'),
      questions: [
        {
          id: 'pricing-main',
          question: this.tr('Pila inyong pricing / packages?', 'How much are your pricing / packages?', 'Magkano ang pricing / packages ninyo?'),
          answer: this.tr(
            'Ang pricing depende sa selected product, features, ug business requirements. Mo-provide mi ug quotation base sa inyong specific needs para mas accurate ug aligned sa inyong operation.',
            'Pricing depends on the selected product, features, and business requirements. We provide a quotation based on your specific needs so it is accurate and aligned with your operations.',
            'Ang pricing ay depende sa selected product, features, at business requirements. Nagpo-provide kami ng quotation base sa specific needs ninyo para mas accurate at aligned sa operations ninyo.',
          ),
        },
        {
          id: 'pricing-no-fixed',
          question: this.tr('Why walay fixed price?', 'Why is there no fixed price?', 'Bakit walang fixed price?'),
          answer: this.tr(
            'Tungod kay ang Liteclerk systems kay modular ug customized per business requirement. Ang matag setup mahimong magkalahi depende sa features, number of users, ug integrations nga needed.',
            'Because Liteclerk systems are modular and customized per business requirement. Each setup may vary depending on features, number of users, and integrations needed.',
            'Dahil modular at customized per business requirement ang Liteclerk systems. Bawat setup puwedeng mag-iba depende sa features, number of users, at integrations na kailangan.',
          ),
        },
        {
          id: 'pricing-payment-type',
          question: this.tr('One-time payment ba or subscription?', 'Is it one-time payment or subscription?', 'One-time payment ba o subscription?'),
          answer: this.tr(
            'Available po ang both options depende sa product. Ang uban systems one-time license with support, samtang ang cloud systems subscription-based para sa continuous access ug updates.',
            'Both options are available depending on the product. Some systems are one-time license with support, while cloud systems are subscription-based for continuous access and updates.',
            'Available po ang both options depende sa product. May systems na one-time license with support, habang ang cloud systems ay subscription-based para sa continuous access at updates.',
          ),
        },
        {
          id: 'pricing-bundles',
          question: this.tr('May bundle packages ba?', 'Are bundle packages available?', 'May bundle packages ba?'),
          answer: this.tr(
            'Yes po, pwede mi mo-provide ug bundled solutions sama sa POS + Accounting + Payroll integration depende sa inyong business requirements.',
            'Yes, we can provide bundled solutions like POS + Accounting + Payroll integration depending on your business requirements.',
            'Yes po, puwede kaming mag-provide ng bundled solutions tulad ng POS + Accounting + Payroll integration depende sa business requirements ninyo.',
          ),
        },
        {
          id: 'pricing-discount',
          question: this.tr('May discount ba?', 'Are discounts available?', 'May discount ba?'),
          answer: this.tr(
            'Yes po, ang discounts mahimong mo-apply depende sa package, system combination, o project scope nga gi-avail.',
            'Yes, discounts may apply depending on the package, system combination, or project scope availed.',
            'Yes po, puwedeng may discounts depende sa package, system combination, o project scope na in-avail.',
          ),
        },
        {
          id: 'pricing-quotation',
          question: this.tr('Pwede magpa quotation?', 'Can we request a quotation?', 'Pwede ba magpa-quotation?'),
          answer: this.tr(
            'Yes po, pwede mi mag-prepare ug detailed quotation base sa inyong business needs ug preferred system setup.',
            'Yes, we can prepare a detailed quotation based on your business needs and preferred system setup.',
            'Yes po, puwede kaming mag-prepare ng detailed quotation base sa business needs at preferred system setup ninyo.',
          ),
        },
        {
          id: 'pricing-turnaround',
          question: this.tr('Gaano katagal ma-provide ang quotation?', 'How long does it take to provide a quotation?', 'Gaano katagal maibigay ang quotation?'),
          answer: this.tr(
            'Kasagaran paspas ra ni once ma-receive namo ang inyong requirements. Amo kining i-review ug ipadala ang proper breakdown para sa transparency.',
            'Usually it is quick once we receive your requirements. We will review and send a proper breakdown for transparency.',
            'Usually mabilis lang po once ma-receive namin ang requirements ninyo. Ire-review namin ito at magsesend ng proper breakdown for transparency.',
          ),
        },
        {
          id: 'pricing-hidden-charges',
          question: this.tr('May hidden charges ba?', 'Are there hidden charges?', 'May hidden charges ba?'),
          answer: this.tr(
            'No po, tanang costs klaro nga gi-state sa official quotation before confirmation para transparent ug clear ang agreement.',
            'No, all costs are clearly stated in the official quotation before confirmation to keep the agreement transparent and clear.',
            'No po, lahat ng costs ay clearly stated sa official quotation before confirmation para transparent at clear ang agreement.',
          ),
        },
      ],
    },
    {
      id: 'hardware-setup',
      label: this.tr('Hardware & Setup', 'Hardware & Setup', 'Hardware & Setup'),
      questions: [
        {
          id: 'hs-pos-hardware-needed',
          question: this.tr('Unsa nga hardware ang gikinahanglan para sa POS system?', 'What hardware is needed for the POS system?', 'Anong hardware ang kailangan para sa POS system?'),
          answer: this.tr(
            'Kasagaran, ang POS system nagkinahanglan ug computer unit, POS printer, cash drawer, ug barcode scanner depende sa inyong business setup ug requirements.',
            'Typically, the POS system requires a computer unit, POS printer, cash drawer, and barcode scanner depending on your business setup and requirements.',
            'Karaniwan, ang POS system ay nangangailangan ng computer unit, POS printer, cash drawer, at barcode scanner depende sa business setup at requirements ninyo.',
          ),
        },
        {
          id: 'hs-hardware-included',
          question: this.tr('Apil ba ang hardware sa package?', 'Is hardware included in the package?', 'Kasama ba ang hardware sa package?'),
          answer: this.tr(
            'Optional po ang hardware. Pwede siya i-bundle with the system o software-only package depende sa inyong preference ug quotation.',
            'Hardware is optional. It can be bundled with the system or offered as a software-only package depending on your preference and quotation.',
            'Optional po ang hardware. Puwede itong i-bundle with the system o software-only package depende sa inyong preference at quotation.',
          ),
        },
        {
          id: 'hs-existing-hardware',
          question: this.tr('Pwede ba gamiton ang existing hardware?', 'Can existing hardware be used?', 'Pwede bang gamitin ang existing hardware?'),
          answer: this.tr(
            'Yes po, pwede gamiton ang existing hardware basta compatible kini sa system requirements. Motabang mi sa pag-check sa compatibility.',
            'Yes, existing hardware can be used as long as it is compatible with the system requirements. We will assist in checking compatibility.',
            'Yes po, puwedeng gamitin ang existing hardware basta compatible ito sa system requirements. Tutulong kami sa pag-check ng compatibility.',
          ),
        },
        {
          id: 'hs-high-end-computer',
          question: this.tr('Kinahanglan ba ug high-end nga computer?', 'Is a high-end computer required?', 'Kailangan ba ng high-end na computer?'),
          answer: this.tr(
            'Dili man po required ang high-end. Ang standard business computer kasagaran igo na depende sa kadak-on sa operation ug number of users.',
            'A high-end computer is not required. A standard business computer is usually enough depending on the size of your operation and number of users.',
            'Hindi po required ang high-end computer. Standard business computer is usually enough depende sa laki ng operation at number of users.',
          ),
        },
        {
          id: 'hs-internet-always',
          question: this.tr('Kinahanglan ba permi ang internet?', 'Is internet always required?', 'Kailangan ba laging may internet?'),
          answer: this.tr(
            'Para sa standalone POS, dili required ang constant internet. Pero kung naka-enable ang cloud integration, recommended ang internet para sa real-time monitoring.',
            'For standalone POS, constant internet is not required. However, if cloud integration is enabled, internet is recommended for real-time monitoring.',
            'Para sa standalone POS, hindi required ang constant internet. Pero kung enabled ang cloud integration, recommended ang internet para sa real-time monitoring.',
          ),
        },
        {
          id: 'hs-mobile-tablet',
          question: this.tr('Pwede ba gamiton ang mobile o tablet?', 'Can mobile phones or tablets be used?', 'Pwede bang gumamit ng mobile o tablet?'),
          answer: this.tr(
            'Yes po, para sa Mobile POS setup, compatible kini with supported Android devices o tablets depende sa configuration.',
            'Yes, for Mobile POS setup, this is compatible with supported Android devices or tablets depending on configuration.',
            'Yes po, para sa Mobile POS setup, compatible ito with supported Android devices o tablets depende sa configuration.',
          ),
        },
        {
          id: 'hs-installation-support',
          question: this.tr('Naa bay installation support?', 'Is installation support available?', 'May installation support ba?'),
          answer: this.tr(
            'Yes po, nag-provide mi ug system installation, setup, ug configuration para smooth ang deployment sa inyong business.',
            'Yes, we provide system installation, setup, and configuration to ensure smooth deployment for your business.',
            'Yes po, nagpo-provide kami ng system installation, setup, at configuration para smooth ang deployment sa business ninyo.',
          ),
        },
        {
          id: 'hs-staff-training',
          question: this.tr('Naa bay training para sa staff?', 'Is staff training included?', 'May training ba para sa staff?'),
          answer: this.tr(
            'Yes po, included ang 2 days training either online o onsite para ma-guide ang inyong staff sa proper use sa system.',
            'Yes, 2 days of training is included, either online or onsite, to guide your staff in proper system use.',
            'Yes po, included ang 2 days training either online o onsite para ma-guide ang staff ninyo sa proper use ng system.',
          ),
        },
      ],
    },
    {
      id: 'installation-support',
      label: this.tr('Installation & Support', 'Installation & Support', 'Installation & Support'),
      questions: [
        {
          id: 'is-installation-service',
          question: this.tr('Naa bay installation service?', 'Do you provide installation service?', 'May installation service ba?'),
          answer: this.tr(
            'Yes po, nag-provide mi ug system installation, setup, ug configuration para masiguro nga sakto ang deployment sa system para sa inyong business.',
            'Yes, we provide system installation, setup, and configuration to ensure the system is properly deployed for your business.',
            'Yes po, nagpo-provide kami ng system installation, setup, at configuration para masigurong maayos ang deployment ng system para sa business ninyo.',
          ),
        },
        {
          id: 'is-onsite-remote',
          question: this.tr('Onsite ba o remote ang installation?', 'Is installation onsite or remote?', 'Onsite o remote ba ang installation?'),
          answer: this.tr(
            'Available po ang both onsite ug remote installation depende sa inyong location ug kasabutan during project setup.',
            'Both onsite and remote installation are available depending on your location and agreement during project setup.',
            'Available po ang both onsite at remote installation depende sa location ninyo at agreement during project setup.',
          ),
        },
        {
          id: 'is-installation-duration',
          question: this.tr('Unsa kadugay ang installation?', 'How long does installation take?', 'Gaano katagal ang installation?'),
          answer: this.tr(
            'Kasagaran 1-3 days depende sa system type, setup complexity, ug business requirements.',
            'Usually 1-3 days depending on system type, setup complexity, and business requirements.',
            'Usually 1-3 days depende sa system type, setup complexity, at business requirements.',
          ),
        },
        {
          id: 'is-training-after',
          question: this.tr('Naa bay training human sa installation?', 'Is there training after installation?', 'May training ba pagkatapos ng installation?'),
          answer: this.tr(
            'Yes po, included ang training para ma-guide ang inyong staff sa proper paggamit sa system for daily operations.',
            'Yes, training is included to guide your staff in proper use of the system for daily operations.',
            'Yes po, included ang training para ma-guide ang staff ninyo sa proper paggamit ng system for daily operations.',
          ),
        },
        {
          id: 'is-after-sales',
          question: this.tr('Naa bay after-sales support?', 'Do you provide after-sales support?', 'May after-sales support ba?'),
          answer: this.tr(
            'Yes po, nag-provide mi ug after-sales support para sa system assistance, troubleshooting, ug operational guidance.',
            'Yes, we provide after-sales support for system assistance, troubleshooting, and operational guidance.',
            'Yes po, nagpo-provide kami ng after-sales support para sa system assistance, troubleshooting, at operational guidance.',
          ),
        },
        {
          id: 'is-system-issue',
          question: this.tr('Unsaon kung naa’y issue sa system?', 'What if there is an issue in the system?', 'Paano kung may issue sa system?'),
          answer: this.tr(
            'Pwede ka mo-contact sa among support team para sa assistance sa Liteclerk Customer Service 09853636020. Nag-provide mi ug remote support, ug onsite support (charges depend sa client location) kung needed depende sa issue.',
            'You may contact our support team for assistance at Liteclerk Customer Service 09853636020. We provide remote support and onsite support (charges depend on client location) if needed, depending on the issue.',
            'Puwede kayong mag-contact sa support team namin for assistance sa Liteclerk Customer Service 09853636020. Nagpo-provide kami ng remote support, at onsite support (charges depend sa client location) kung kailangan depende sa issue.',
          ),
        },
        {
          id: 'is-support-hours',
          question: this.tr('Naa bay support hours?', 'Do you have support hours?', 'May support hours ba?'),
          answer: this.tr(
            'Yes po, available ang support within business hours, ug ang emergency assistance mahimong ma-arrange depende sa service agreement.',
            'Yes, support is available within business hours, and emergency assistance may be arranged depending on the service agreement.',
            'Yes po, available ang support within business hours, at ang emergency assistance puwedeng ma-arrange depende sa service agreement.',
          ),
        },
        {
          id: 'is-warranty',
          question: this.tr('Naa bay warranty ang system?', 'Does the system have a warranty?', 'May warranty ba ang system?'),
          answer: this.tr(
            'Yes po, ang system warranty ug support coverage depende sa package ug agreement nga apil sa inyong quotation.',
            'Yes, system warranty and support coverage depend on the package and agreement included in your quotation.',
            'Yes po, ang system warranty at support coverage ay depende sa package at agreement na kasama sa quotation ninyo.',
          ),
        },
        {
          id: 'is-support-charge',
          question: this.tr('Naa bay additional charge para sa support?', 'Is there an additional charge for support?', 'May additional charge ba para sa support?'),
          answer: this.tr(
            'Ang support mahimong free sulod sa warranty o active service period. Outside coverage, mahimong mo-apply ang service fees depende sa concern.',
            'Support may be free within warranty or active service period. Outside coverage, service fees may apply depending on the concern.',
            'Ang support puwedeng free within warranty o active service period. Outside coverage, puwedeng may service fees depende sa concern.',
          ),
        },
      ],
    },
    {
      id: 'bir-compliance',
      label: this.tr('BIR Compliance', 'BIR Compliance', 'BIR Compliance'),
      questions: [
        {
          id: 'bir-liteclerk-accredited',
          question: this.tr('BIR accredited ba ang Liteclerk POS?', 'Is Liteclerk POS BIR accredited?', 'BIR accredited ba ang Liteclerk POS?'),
          answer: this.tr(
            'Yes po, ang Liteclerk POS designed para mosuporta sa BIR compliance requirements ug mahimong gamiton para sa regulated business operations depende sa proper registration.',
            'Yes, Liteclerk POS is designed to support BIR compliance requirements and can be used for regulated business operations with proper registration.',
            'Yes po, ang Liteclerk POS ay designed para suportahan ang BIR compliance requirements at puwedeng gamitin para sa regulated business operations depende sa proper registration.',
          ),
        },
        {
          id: 'bir-registration-ptu-assist',
          question: this.tr('Mutabang ba mo sa BIR registration / PTU?', 'Will you assist with BIR registration / PTU?', 'Mag-a-assist ba kayo sa BIR registration / PTU?'),
          answer: this.tr(
            'Yes po, nag-provide mi ug guidance ug assistance sa BIR registration ug PTU processing para matabangan ka makumpleto ang required compliance steps.',
            'Yes, we provide guidance and assistance in BIR registration and PTU processing to help you complete the required compliance steps.',
            'Yes po, nagpo-provide kami ng guidance at assistance sa BIR registration at PTU processing para matulungan kayong makumpleto ang required compliance steps.',
          ),
        },
        {
          id: 'bir-registration-requirements',
          question: this.tr('Unsa ang mga requirements para sa BIR registration?', 'What are the requirements for BIR registration?', 'Ano ang requirements para sa BIR registration?'),
          answer: this.tr(
            'Kasagaran requirements apil ang business registration documents, TIN, BIR 2303, ug uban pang related permits. Amo kang i-guide step-by-step base sa inyong business type.',
            'Requirements usually include business registration documents, TIN, BIR 2303, and other related permits. We will guide you step-by-step based on your business type.',
            'Karaniwang requirements ang business registration documents, TIN, BIR 2303, at iba pang related permits. Iga-guide namin kayo step-by-step base sa business type ninyo.',
          ),
        },
        {
          id: 'bir-without-approval',
          question: this.tr('Pwede ba gamiton ang system nga walay BIR approval?', 'Can the system be used without BIR approval?', 'Pwede bang gamitin ang system nang walang BIR approval?'),
          answer: this.tr(
            'Ang system pwede ma-install ug ma-configure, pero para sa official use, required ang proper BIR registration ug approval para sa compliance.',
            'The system can be installed and configured, but for official use, proper BIR registration and approval are required for compliance.',
            'Puwedeng ma-install at ma-configure ang system, pero para sa official use, required ang proper BIR registration at approval para sa compliance.',
          ),
        },
        {
          id: 'bir-reporting-compatible',
          question: this.tr('Compatible ba sa BIR reporting requirements?', 'Is it compatible with BIR reporting requirements?', 'Compatible ba sa BIR reporting requirements?'),
          answer: this.tr(
            'Yes po, ang system mosuporta ug reporting features nga aligned sa standard BIR requirements para sa sales ug business records.',
            'Yes, the system supports reporting features aligned with standard BIR requirements for sales and business records.',
            'Yes po, sinusuportahan ng system ang reporting features na aligned sa standard BIR requirements para sa sales at business records.',
          ),
        },
        {
          id: 'bir-compliance-responsible',
          question: this.tr('Kinsa ang responsible sa compliance?', 'Who is responsible for compliance?', 'Sino ang responsable sa compliance?'),
          answer: this.tr(
            'Ang client ang responsible sa pag-maintain sa proper BIR compliance, samtang ang Liteclerk mo-provide ug system support ug guidance para sa setup ug reporting.',
            'The client is responsible for maintaining proper BIR compliance, while Liteclerk provides system support and guidance for setup and reporting.',
            'Ang client ang responsible sa pag-maintain ng proper BIR compliance, habang ang Liteclerk ay nagbibigay ng system support at guidance para sa setup at reporting.',
          ),
        },
        {
          id: 'bir-penalty-noncompliance',
          question: this.tr('Naa bay penalty kung dili compliant?', 'Are there penalties if not compliant?', 'May penalty ba kapag hindi compliant?'),
          answer: this.tr(
            'Yes po, ang penalties kay handled sa BIR. Mao nga strongly recommended gyud nga mahuman ang registration with proper guidance before full operation.',
            'Yes, penalties are handled by BIR. That is why we strongly recommend completing registration with proper guidance before full operation.',
            'Yes po, penalties are handled by BIR. Kaya strongly recommended na makumpleto ang registration with proper guidance before full operation.',
          ),
        },
        {
          id: 'bir-after-registration-assist',
          question: this.tr('Naa bay assistance human sa registration?', 'Is there assistance after registration?', 'May assistance ba pagkatapos ng registration?'),
          answer: this.tr(
            'Yes po, nagpadayon ang among system support para masiguro nga ang inyong reports ug operations aligned sa inyong registered setup.',
            'Yes, we provide ongoing system support to ensure your reports and operations remain aligned with your registered setup.',
            'Yes po, may ongoing system support kami para masigurong aligned ang reports at operations ninyo sa registered setup ninyo.',
          ),
        },
      ],
    },
    {
      id: 'demo-inquiry',
      label: this.tr('Demo / Inquiry', 'Demo / Inquiry', 'Demo / Inquiry'),
      questions: [
        {
          id: 'di-system-demo',
          question: this.tr('Pwede ba magpa-demo sa system?', 'Can we request a system demo?', 'Pwede ba magpa-demo ng system?'),
          answer: this.tr(
            'Yes po, nag-offer mi ug system demo para ma-experience ninyo kung giunsa pag-work ang Liteclerk base sa inyong business needs ug requirements. Pwede mo-contact sa 0985 363 6020 para sa scheduling.',
            'Yes, we offer a system demo so you can experience how Liteclerk works based on your business needs and requirements. You may contact us at 0985 363 6020 for scheduling.',
            'Yes po, nag-ooffer kami ng system demo para ma-experience ninyo kung paano gumagana ang Liteclerk base sa business needs at requirements ninyo. You may contact us at 0985 363 6020 for scheduling.',
          ),
        },
        {
          id: 'di-demo-free',
          question: this.tr('Libre ba ang demo?', 'Is the demo free?', 'Libre ba ang demo?'),
          answer: this.tr(
            'Yes po, free ang initial system demo para ma-evaluate ninyo ang features before deciding. Pwede mo-contact sa 0985 363 6020 para assistance.',
            'Yes, the initial system demo is free so you can evaluate the features before deciding. You may contact 0985 363 6020 for assistance.',
            'Yes po, free ang initial system demo para ma-evaluate ninyo ang features before deciding. You may contact 0985 363 6020 for assistance.',
          ),
        },
        {
          id: 'di-schedule-demo',
          question: this.tr('Unsaon pag-schedule og demo?', 'How do we schedule a demo?', 'Paano magpa-schedule ng demo?'),
          answer: this.tr(
            'Pwede nimo ipadala ang inyong preferred schedule, unya among team mo-coordinate para sa available time slot. Para mas paspas nga assistance, pwede ka mo-contact sa 0985 363 6020.',
            'You may send your preferred schedule, and our team will coordinate with you for an available time slot. For faster assistance, you may contact 0985 363 6020.',
            'Puwede ninyong ipadala ang preferred schedule ninyo, at magco-coordinate ang team namin para sa available time slot. For faster assistance, you may contact 0985 363 6020.',
          ),
        },
        {
          id: 'di-online-onsite',
          question: this.tr('Online ba o onsite ang demo?', 'Is the demo online or onsite?', 'Online o onsite ba ang demo?'),
          answer: this.tr(
            'Available po ang both online ug onsite demo depende sa inyong location ug preference. Pwede mo-reach sa 0985 363 6020 para sa arrangements.',
            'Both online and onsite demos are available depending on your location and preference. You may reach us at 0985 363 6020 for arrangements.',
            'Available po ang both online at onsite demo depende sa location at preference ninyo. You may reach us at 0985 363 6020 for arrangements.',
          ),
        },
        {
          id: 'di-demo-duration',
          question: this.tr('Unsa kadugay ang demo?', 'How long is the demo?', 'Gaano katagal ang demo?'),
          answer: this.tr(
            'Kasagaran 30 minutes to 1 hour depende sa system ug sa mga pangutana during presentation. Para sa inquiries, contact 0985 363 6020.',
            'Usually 30 minutes to 1 hour depending on the system and questions during the presentation. For inquiries, contact 0985 363 6020.',
            'Usually 30 minutes to 1 hour depende sa system at mga tanong during the presentation. For inquiries, contact 0985 363 6020.',
          ),
        },
        {
          id: 'di-customized-demo',
          question: this.tr('Pwede ba i-customize ang demo base sa akong business?', 'Can the demo be customized based on my business?', 'Pwede bang i-customize ang demo base sa business ko?'),
          answer: this.tr(
            'Yes po, pwede namo i-tailor ang demo base sa inyong business type para mas relevant ang features nga maipakita. Pwede mo-contact sa 0985 363 6020 para details.',
            'Yes, we can tailor the demo based on your business type so the shown features are more relevant. You may contact 0985 363 6020 for details.',
            'Yes po, puwede naming i-tailor ang demo base sa business type ninyo para mas relevant ang features na maipapakita. You may contact 0985 363 6020 for details.',
          ),
        },
        {
          id: 'di-quotation-after-demo',
          question: this.tr('Naa bay quotation human sa demo?', 'Is there a quotation after demo?', 'May quotation ba pagkatapos ng demo?'),
          answer: this.tr(
            'Yes po, after sa demo pwede mi mo-provide ug detailed quotation base sa inyong selected system ug requirements. Para sa assistance, tawag sa 0985 363 6020.',
            'Yes, after the demo we can provide a detailed quotation based on your selected system and requirements. For assistance, call 0985 363 6020.',
            'Yes po, after ng demo puwede kaming mag-provide ng detailed quotation base sa selected system at requirements ninyo. For assistance, call 0985 363 6020.',
          ),
        },
        {
          id: 'di-inquiry-no-commitment',
          question: this.tr('Pwede ba mag-inquire lang nga walay commitment?', 'Can we inquire without commitment?', 'Pwede bang mag-inquire lang nang walang commitment?'),
          answer: this.tr(
            'Yes po, pwede ra kaayo mo-inquire ug mo-explore sa system without any obligation. Para sa questions, pwede mo-contact sa 0985 363 6020 anytime.',
            'Yes, you can freely inquire and explore the system without any obligation. For questions, you may contact 0985 363 6020 anytime.',
            'Yes po, puwede kayong mag-inquire at mag-explore ng system without any obligation. For questions, you may contact 0985 363 6020 anytime.',
          ),
        },
      ],
    },
    {
      id: 'humidefi-reward',
      label: this.tr('Humidefi Reward', 'Humidefi Reward', 'Humidefi Reward'),
      questions: [
        {
          id: 'hr-what-is',
          question: this.tr('Unsa ang Humidefi Reward?', 'What is Humidefi Reward?', 'Ano ang Humidefi Reward?'),
          answer: this.tr(
            'Ang Humidefi Reward usa ka modern loyalty system nga powered by Xode Blockchain diin ang customer rewards ma-record on-chain, busa transparent, secure, ug tinuod nga gipanag-iya sa customer.',
            'Humidefi Reward is a modern loyalty system powered by Xode Blockchain where customer rewards are recorded on-chain, making them transparent, secure, and truly owned by the customer.',
            'Ang Humidefi Reward ay isang modern loyalty system na powered by Xode Blockchain kung saan ang customer rewards ay naka-record on-chain, kaya transparent, secure, at tunay na pagmamay-ari ng customer.',
          ),
        },
        {
          id: 'hr-difference-traditional',
          question: this.tr('Unsa kalahi sa traditional loyalty points?', 'How is it different from traditional loyalty points?', 'Paano ito naiiba sa traditional loyalty points?'),
          answer: this.tr(
            'Dili pareho sa traditional points, ang Humidefi rewards fully on-chain ug verifiable. Pasabot ani, dili lang ni ordinary points system, kundili real digital assets nga naay transparency ug ownership ang customers.',
            'Unlike traditional points, Humidefi rewards are fully on-chain and verifiable. This means it is not just a points system but real digital assets with transparency and ownership for customers.',
            'Unlike traditional points, ang Humidefi rewards ay fully on-chain at verifiable. Ibig sabihin, hindi lang ito points system kundi real digital assets na may transparency at ownership ang customers.',
          ),
        },
        {
          id: 'hr-safe-system',
          question: this.tr('Luwas ba ang rewards system?', 'Is the rewards system safe?', 'Safe ba ang rewards system?'),
          answer: this.tr(
            'Yes po, tungod kay powered kini sa blockchain technology, ang rewards tamper-proof, secure, ug transparent.',
            'Yes, since it is powered by blockchain technology, rewards are tamper-proof, secure, and transparent.',
            'Yes po, dahil powered ito ng blockchain technology, ang rewards ay tamper-proof, secure, at transparent.',
          ),
        },
        {
          id: 'hr-customer-view',
          question: this.tr('Pwede ba ma-view sa customer ang ilang rewards?', 'Can customers view their rewards?', 'Pwede ba ma-view ng customer ang rewards nila?'),
          answer: this.tr(
            'Yes po, ang customers maka-view ug maka-manage sa ilang rewards pinaagi sa Xterium Wallet, nga naghatag nila ug full control ug visibility.',
            'Yes, customers can view and manage their rewards through the Xterium Wallet, giving them full control and visibility.',
            'Yes po, puwedeng ma-view at ma-manage ng customers ang rewards nila through the Xterium Wallet, kaya may full control at visibility sila.',
          ),
        },
        {
          id: 'hr-redemption-process',
          question: this.tr('Unsaon pag-redeem sa rewards?', 'How does reward redemption work?', 'Paano ang redemption ng rewards?'),
          answer: this.tr(
            'Real-time ang redemption process, pasabot niini ang customers makagamit o maka-redeem sa ilang rewards dayon-dayon nga walay delay o manual processing.',
            'The redemption process is real-time, meaning customers can use or redeem their rewards instantly without delays or manual processing.',
            'Real-time ang redemption process, ibig sabihin puwedeng gamitin o i-redeem ng customers ang rewards nila agad nang walang delays o manual processing.',
          ),
        },
        {
          id: 'hr-special-app',
          question: this.tr('Kinahanglan ba ug special app para sa customers?', 'Do customers need a special app?', 'Kailangan ba ng special app para sa customers?'),
          answer: this.tr(
            'Yes po, ang customers pwede mogamit sa Xterium Wallet para makita ang rewards, ug ang merchants pwede pud mohatag ug branded mobile app para sa seamless registration ug engagement.',
            'Yes, customers can use the Xterium Wallet to view rewards, and merchants can also provide a branded mobile app for seamless registration and engagement.',
            'Yes po, puwedeng gamitin ng customers ang Xterium Wallet para makita ang rewards, at puwede ring mag-provide ang merchants ng branded mobile app para seamless ang registration at engagement.',
          ),
        },
        {
          id: 'hr-small-business',
          question: this.tr('Pwede ba ni sa small business?', 'Can this be used for small businesses?', 'Pwede ba sa small business?'),
          answer: this.tr(
            'Yes po, scalable ang Humidefi ug pwede gamiton sa small ug large merchants depende sa setup ug requirements.',
            'Yes, Humidefi is scalable and can be used by both small and large merchants depending on setup and requirements.',
            'Yes po, scalable ang Humidefi at puwedeng gamitin ng small at large merchants depende sa setup at requirements.',
          ),
        },
        {
          id: 'hr-integrate-existing',
          question: this.tr('Pwede ba i-integrate sa existing business system?', 'Can it be integrated with an existing business system?', 'Pwede ba i-integrate sa existing business system?'),
          answer: this.tr(
            'Yes po, ang system designed para sa modern merchants ug pwede i-integrate depende sa inyong business setup ug requirements.',
            'Yes, the system is designed for modern merchants and can be integrated depending on your business setup and requirements.',
            'Yes po, ang system ay designed para sa modern merchants at puwedeng i-integrate depende sa business setup at requirements ninyo.',
          ),
        },
        {
          id: 'hr-business-advantage',
          question: this.tr('Unsa ang advantage niini sa business?', 'What is the advantage for businesses?', 'Ano ang advantage nito sa business?'),
          answer: this.tr(
            'Makatabang kini sa pagtaas sa customer loyalty, repeat purchases, ug engagement pinaagi sa paghatag sa customers ug tinuod, transparent, ug bililhong rewards.',
            'It helps increase customer loyalty, repeat purchases, and engagement by giving customers real, transparent, and valuable rewards.',
            'Nakakatulong ito para tumaas ang customer loyalty, repeat purchases, at engagement sa pamamagitan ng pagbibigay sa customers ng real, transparent, at valuable rewards.',
          ),
        },
        {
          id: 'hr-merchant-branding',
          question: this.tr('Naa bay branding para sa merchant?', 'Is there a branding option for merchants?', 'May branding option ba para sa merchant?'),
          answer: this.tr(
            'Yes po, naay branded mobile app option aron makahatag ang merchants ug customized customer experience nga aligned sa ilang business identity.',
            'Yes, there is a branded mobile app option so merchants can provide a customized customer experience aligned with their business identity.',
            'Yes po, may branded mobile app option para makapagbigay ang merchants ng customized customer experience na aligned sa business identity nila.',
          ),
        },
      ],
    },
  ];

  setLanguage(code: LanguageCode): void {
    this.selectedLanguage = code;
    this.resetConversation();
  }

  selectQuestion(optionId: string): void {
    const selectedOption = this.quickOptions.find((item) => item.id === optionId);
    if (!selectedOption) {
      return;
    }

    this.pushUserMessage(selectedOption.label);

    if (optionId.startsWith('general:')) {
      this.handleGeneralQuestion(optionId.replace('general:', ''));
      return;
    }

    if (optionId === 'action:open-category-menu') {
      this.mode = 'category-menu';
      this.activeCategoryId = null;
      this.resetOptionPagination();
      this.pushAssistantMessage(this.getCategoryPromptText());
      return;
    }

    if (optionId.startsWith('category:')) {
      const categoryId = optionId.replace('category:', '');
      this.mode = 'category-questions';
      this.activeCategoryId = categoryId;
      this.resetOptionPagination();
      if (!this.askedCategoryQuestionIds.has(categoryId)) {
        this.askedCategoryQuestionIds.set(categoryId, new Set<string>());
      }
      const category = this.categories.find((item) => item.id === categoryId);
      if (category) {
        this.pushAssistantMessage(this.getCategoryWelcomeText(this.getText(category.label)));
      }
      return;
    }

    if (optionId.startsWith('catq:')) {
      this.handleCategoryQuestion(optionId.replace('catq:', ''));
      return;
    }

    if (optionId === 'action:back-to-categories') {
      this.mode = 'category-menu';
      this.activeCategoryId = null;
      this.resetOptionPagination();
      this.pushAssistantMessage(this.getCategoryPromptText());
      return;
    }

    if (optionId === 'action:contact-us') {
      this.pushAssistantMessage(this.getContactUsText());
    }
  }

  getText(content: LocalizedText): string {
    return content[this.selectedLanguage];
  }

  get quickOptions(): QuickOption[] {
    if (this.mode === 'general') {
      const options: QuickOption[] = this.generalQuestions
        .filter((item) => !this.askedGeneralQuestionIds.has(item.id))
        .map((item) => ({
          id: `general:${item.id}`,
          label: this.getText(item.question),
        }));

      options.push({
        id: 'action:open-category-menu',
        label: this.getDifferentQuestionLabel(),
      });

      return options;
    }

    if (this.mode === 'category-menu') {
      return this.categories.map((item) => ({
        id: `category:${item.id}`,
        label: this.getText(item.label),
      }));
    }

    const category = this.categories.find((item) => item.id === this.activeCategoryId);
    if (!category) {
      return [{ id: 'action:back-to-categories', label: this.getDifferentQuestionLabel() }];
    }

    const askedSet = this.askedCategoryQuestionIds.get(category.id) ?? new Set<string>();
    const categoryOptions = category.questions
      .filter((item) => !askedSet.has(item.id))
      .map((item) => ({
        id: `catq:${item.id}`,
        label: this.getText(item.question),
      }));

    categoryOptions.push({ id: 'action:back-to-categories', label: this.getDifferentQuestionLabel() });

    return categoryOptions;
  }

  get visibleQuickOptions(): QuickOption[] {
    const regularOptions = this.quickOptions.filter((item) => !item.id.startsWith('action:'));
    const actionOptions = this.quickOptions.filter((item) => item.id.startsWith('action:'));

    return [...regularOptions.slice(0, this.visibleRegularOptionLimit), ...actionOptions];
  }

  get hasHiddenRegularOptions(): boolean {
    const regularCount = this.quickOptions.filter((item) => !item.id.startsWith('action:')).length;
    return regularCount > this.visibleRegularOptionLimit;
  }

  getWelcomeText(): string {
    if (this.selectedLanguage === 'tl') {
      return 'Hi! Ako ang Liteclerk Assistant. Pumili ng tanong sa ibaba para sa mabilis na sagot.';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'Hi! Ako ang Liteclerk Assistant. Pilia ang pangutana sa ubos para sa paspas nga tubag.';
    }

    return 'Hi! This is Liteclerk Assistant. Choose a question below for a quick answer.';
  }

  getAllDoneText(): string {
    if (this.selectedLanguage === 'tl') {
      return 'Nasagot na ang lahat ng mabilisang tanong. Puwede mong i-reset ang chat o gamitin ang Contact Us form.';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'Natubag na ang tanang dali nga pangutana. Pwede nimo i-reset ang chat o gamita ang Contact Us form.';
    }

    return 'All quick questions are already answered. You can reset this chat or use the Contact Us form.';
  }

  getDifferentQuestionLabel(): string {
    if (this.selectedLanguage === 'tl') {
      return 'May iba pa akong tanong';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'Naa pa koy laing pangutana';
    }

    return 'I have a different question';
  }

  getCategoryPromptText(): string {
    if (this.selectedLanguage === 'tl') {
      return 'Aling bahagi ng Liteclerk ang gusto mong itanong? Pumili sa mga pagpipilian sa ibaba. O puwede mong ipadala ang buong tanong mo gamit ang Contact Us form, at tutulong agad ang team namin.';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'Unsa nga bahin sa Liteclerk ang gusto nimong pangutan-on? Pilia sa mga kapilian sa ubos. O pwede nimo ipadala ang imong tibuok pangutana gamit ang Contact Us form ug mutabang dayon ang among team.';
    }

    return 'Which part of Liteclerk would you like to ask about? Choose from the options below or you can send your complete question using the Contact Us form, and our team will assist you right away.';
  }

  getCategoryWelcomeText(categoryLabel: string): string {
    if (this.selectedLanguage === 'tl') {
      return `Narito ang mga madalas itanong para sa ${categoryLabel}.`;
    }

    if (this.selectedLanguage === 'ceb') {
      return `Ania ang kasagarang pangutana para sa ${categoryLabel}.`;
    }

    return `Here are the common questions for ${categoryLabel}.`;
  }

  getContactOptionLabel(): string {
    if (this.selectedLanguage === 'tl') {
      return 'Ipadala ang buong tanong gamit ang Contact Us form';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'Ipadala ang tibuok pangutana gamit ang Contact Us form';
    }

    return 'Send complete question via Contact Us form';
  }

  getContactUsText(): string {
    if (this.selectedLanguage === 'tl') {
      return 'Puwede mong ipadala ang buong tanong mo gamit ang Contact Us form, at tutulong agad ang team namin.';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'Pwede nimo ipadala ang imong tibuok pangutana gamit ang Contact Us form ug mutabang dayon ang among team.';
    }

    return 'You can send your complete question using the Contact Us form, and our team will assist you right away.';
  }

  getResetLabel(): string {
    if (this.selectedLanguage === 'tl') {
      return 'I-reset ang chat';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'I-reset ang chat';
    }

    return 'Reset chat';
  }

  getShowMoreLabel(): string {
    if (this.selectedLanguage === 'tl') {
      return 'Magpakita pa ng mga tanong';
    }

    if (this.selectedLanguage === 'ceb') {
      return 'Ipakita pa ang dugang pangutana';
    }

    return 'Show more questions';
  }

  showMoreOptions(): void {
    this.visibleRegularOptionLimit += this.initialOptionLimit;
  }

  resetConversation(): void {
    this.mode = 'general';
    this.activeCategoryId = null;
    this.resetOptionPagination();
    this.askedGeneralQuestionIds.clear();
    this.askedCategoryQuestionIds.clear();
    this.messages = [{ role: 'assistant', text: this.getWelcomeText() }];
  }

  private handleGeneralQuestion(questionId: string): void {
    if (this.askedGeneralQuestionIds.has(questionId)) {
      return;
    }

    const question = this.generalQuestions.find((item) => item.id === questionId);
    if (!question) {
      return;
    }

    this.askedGeneralQuestionIds.add(questionId);
    this.pushAssistantMessage(this.getText(question.answer));
  }

  private handleCategoryQuestion(questionId: string): void {
    if (!this.activeCategoryId) {
      return;
    }

    const category = this.categories.find((item) => item.id === this.activeCategoryId);
    if (!category) {
      return;
    }

    const question = category.questions.find((item) => item.id === questionId);
    if (!question) {
      return;
    }

    let askedSet = this.askedCategoryQuestionIds.get(category.id);
    if (!askedSet) {
      askedSet = new Set<string>();
      this.askedCategoryQuestionIds.set(category.id, askedSet);
    }

    if (askedSet.has(questionId)) {
      return;
    }

    askedSet.add(questionId);
    this.pushAssistantMessage(this.getText(question.answer));

    if (askedSet.size === category.questions.length) {
      this.pushAssistantMessage(this.getAllDoneText());
    }
  }

  private pushUserMessage(text: string): void {
    this.messages = [...this.messages, { role: 'user', text }];
  }

  private pushAssistantMessage(text: string): void {
    this.messages = [...this.messages, { role: 'assistant', text }];
    this.scrollToLatestAnswer();
  }

  private scrollToLatestAnswer(): void {
    if (typeof window === 'undefined') {
      return;
    }

    setTimeout(() => {
      const container = this.messagesContainer?.nativeElement;
      if (!container) {
        return;
      }

      const messageRows = container.querySelectorAll('.message-row');
      const latestMessage = messageRows.item(messageRows.length - 1);
      if (latestMessage instanceof HTMLElement) {
        latestMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 0);
  }

  private resetOptionPagination(): void {
    this.visibleRegularOptionLimit = this.initialOptionLimit;
  }

  private tr(ceb: string, en: string, tl: string): LocalizedText {
    return {
      en,
      tl,
      ceb,
    };
  }
}
