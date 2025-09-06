import { Protocol } from "../../types/protocol";

export const MAPI: Protocol = {
    id: "mapi",
    name: "MAPI",
    category: "APIs",
    difficulty: "Advanced",
    shortDescription: "Messaging Application Programming Interface for Microsoft Exchange and Outlook",
    fullDescription: "MAPI (Messaging Application Programming Interface) is a proprietary messaging architecture and client interface to Microsoft Exchange Server. It allows client applications to become messaging-enabled, -aware, or -based by calling MAPI functions to send and receive messages.",
    port: "135 (RPC Endpoint Mapper), Dynamic RPC ports",
    advantages: [
      "Rich messaging features",
      "Deep Exchange integration",
      "Offline capability",
      "Advanced calendaring",
      "Full object model",
      "Efficient synchronization"
    ],
    disadvantages: [
      "Windows-centric",
      "Complex implementation",
      "Proprietary protocol",
      "Performance overhead",
      "Debugging difficulties",
      "Version compatibility"
    ],
    useCases: [
      "Microsoft Outlook client",
      "Exchange Server communication",
      "Enterprise email systems",
      "Calendar applications",
      "Contact management",
      "Custom messaging apps",
      "Workflow automation",
      "Email archiving systems",
      "CRM integration",
      "Business applications",
      "Mobile email clients",
      "Third-party email tools"
    ],
    examples: [
      {
        title: "MAPI Architecture Overview",
        code: `# MAPI Architecture Components

# MAPI Client Application
#       |
#       v
# MAPI Subsystem (MAPI32.DLL)
#       |
#       v
# MAPI Service Providers:
# - Message Store Provider (Exchange, PST)
# - Transport Provider (SMTP, Exchange)
# - Address Book Provider (Exchange GAL, Contacts)

# MAPI Session Initialization
HRESULT hr;
LPMAPISESSION lpSession = NULL;

// Initialize MAPI
hr = MAPIInitialize(NULL);
if (FAILED(hr)) return hr;

// Logon to MAPI session
hr = MAPILogonEx(0,                    // Parent window
                 NULL,                 // Profile name (default)
                 NULL,                 // Password
                 MAPI_EXTENDED |       // Extended MAPI
                 MAPI_USE_DEFAULT,     // Use default profile
                 &lpSession);          // Session object

# MAPI Object Hierarchy
Session (IMAPISession)
├── Message Stores (IMsgStore)
│   ├── Folders (IMAPIFolder)
│   │   ├── Messages (IMessage)
│   │   ├── Attachments (IAttach)
│   │   └── Recipients (IRecipient)
│   └── Properties
├── Address Books (IAddrBook)
│   └── Containers (IABContainer)
│       └── Recipients (IMailUser)
└── Status Objects (IMAPIStatus)

# MAPI Properties (PT_* types)
PT_UNSPECIFIED    = 0x0000    // Unspecified
PT_NULL           = 0x0001    // Null
PT_I2             = 0x0002    // 16-bit signed integer
PT_LONG           = 0x0003    // 32-bit signed integer
PT_R4             = 0x0004    // 4-byte floating point
PT_DOUBLE         = 0x0005    // 8-byte floating point
PT_CURRENCY       = 0x0006    // Currency
PT_APPTIME        = 0x0007    // Application time
PT_ERROR          = 0x000A    // 32-bit error value
PT_BOOLEAN        = 0x000B    // Boolean
PT_OBJECT         = 0x000D    // Object
PT_I8             = 0x0014    // 8-byte signed integer
PT_STRING8        = 0x001E    // 8-bit string
PT_UNICODE        = 0x001F    // Unicode string
PT_SYSTIME        = 0x0040    // FILETIME
PT_CLSID          = 0x0048    // GUID
PT_BINARY         = 0x0102    // Binary data

# Common MAPI Property Tags
PR_DISPLAY_NAME       = 0x3001001F    // Display name
PR_EMAIL_ADDRESS      = 0x3003001F    // Email address
PR_SUBJECT            = 0x0037001F    // Message subject
PR_BODY               = 0x1000001F    // Message body
PR_MESSAGE_CLASS      = 0x001A001F    // Message class
PR_CREATION_TIME      = 0x30070040    // Creation time
PR_LAST_MODIFICATION_TIME = 0x30080040 // Last modified time`,
        explanation: "MAPI architecture, object hierarchy, and property system overview."
      },
      {
        title: "MAPI Programming Examples",
        code: `// C++ MAPI Example - Send Email
#include <windows.h>
#include <mapi.h>
#include <mapix.h>
#include <mapiutil.h>

HRESULT SendMAPIEmail()
{
    HRESULT hr = S_OK;
    LPMAPISESSION lpSession = NULL;
    LPMDB lpMsgStore = NULL;
    LPMAPIFOLDER lpOutbox = NULL;
    LPMESSAGE lpMessage = NULL;
    
    // Initialize MAPI
    hr = MAPIInitialize(NULL);
    if (FAILED(hr)) return hr;
    
    // Logon to session
    hr = MAPILogonEx(0, NULL, NULL, 
                     MAPI_EXTENDED | MAPI_USE_DEFAULT, 
                     &lpSession);
    if (FAILED(hr)) goto cleanup;
    
    // Open default message store
    hr = HrOpenDefaultMsgStore(lpSession, &lpMsgStore);
    if (FAILED(hr)) goto cleanup;
    
    // Open Outbox folder
    ULONG ulObjType;
    hr = lpMsgStore->OpenEntry(0, NULL, NULL, 
                               MAPI_MODIFY, &ulObjType, 
                               (LPUNKNOWN*)&lpOutbox);
    if (FAILED(hr)) goto cleanup;
    
    // Create new message
    hr = lpOutbox->CreateMessage(NULL, 0, &lpMessage);
    if (FAILED(hr)) goto cleanup;
    
    // Set message properties
    SPropValue props[3];
    props[0].ulPropTag = PR_SUBJECT;
    props[0].Value.lpszA = "Test MAPI Message";
    
    props[1].ulPropTag = PR_BODY;
    props[1].Value.lpszA = "This is a test message sent via MAPI.";
    
    props[2].ulPropTag = PR_MESSAGE_CLASS;
    props[2].Value.lpszA = "IPM.Note";
    
    hr = lpMessage->SetProps(3, props, NULL);
    if (FAILED(hr)) goto cleanup;
    
    // Add recipient
    LPMAPITABLE lpRecipTable = NULL;
    hr = lpMessage->GetRecipientTable(0, &lpRecipTable);
    if (FAILED(hr)) goto cleanup;
    
    ADRENTRY adrEntry = {0};
    adrEntry.cValues = 3;
    adrEntry.rgPropVals = new SPropValue[3];
    
    adrEntry.rgPropVals[0].ulPropTag = PR_DISPLAY_NAME;
    adrEntry.rgPropVals[0].Value.lpszA = "Test User";
    
    adrEntry.rgPropVals[1].ulPropTag = PR_EMAIL_ADDRESS;
    adrEntry.rgPropVals[1].Value.lpszA = "test@example.com";
    
    adrEntry.rgPropVals[2].ulPropTag = PR_RECIPIENT_TYPE;
    adrEntry.rgPropVals[2].Value.ul = MAPI_TO;
    
    ADRLIST adrList = {0};
    adrList.cEntries = 1;
    adrList.aEntries = &adrEntry;
    
    hr = lpMessage->ModifyRecipients(MODRECIP_ADD, &adrList);
    if (FAILED(hr)) goto cleanup;
    
    // Save and submit message
    hr = lpMessage->SaveChanges(KEEP_OPEN_READWRITE);
    if (FAILED(hr)) goto cleanup;
    
    hr = lpMessage->SubmitMessage(0);
    
cleanup:
    if (lpMessage) lpMessage->Release();
    if (lpOutbox) lpOutbox->Release();
    if (lpMsgStore) lpMsgStore->Release();
    if (lpSession) lpSession->Release();
    MAPIUninitialize();
    return hr;
}

// C# MAPI Wrapper Example using Outlook Object Model
using Microsoft.Office.Interop.Outlook;
using System;

public class MAPIHelper
{
    private Application outlookApp;
    
    public MAPIHelper()
    {
        outlookApp = new Application();
    }
    
    public void SendEmail(string to, string subject, string body)
    {
        try
        {
            MailItem mailItem = outlookApp.CreateItem(OlItemType.olMailItem);
            mailItem.To = to;
            mailItem.Subject = subject;
            mailItem.Body = body;
            mailItem.Send();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
        }
    }
    
    public void CreateAppointment(string subject, DateTime start, DateTime end)
    {
        AppointmentItem appointment = outlookApp.CreateItem(OlItemType.olAppointmentItem);
        appointment.Subject = subject;
        appointment.Start = start;
        appointment.End = end;
        appointment.ReminderSet = true;
        appointment.ReminderMinutesBeforeStart = 15;
        appointment.Save();
    }
    
    public void ReadInbox()
    {
        NameSpace nameSpace = outlookApp.GetNamespace("MAPI");
        MAPIFolder inbox = nameSpace.GetDefaultFolder(OlDefaultFolders.olFolderInbox);
        
        foreach (object item in inbox.Items)
        {
            if (item is MailItem mailItem)
            {
                Console.WriteLine($"From: {mailItem.SenderName}");
                Console.WriteLine($"Subject: {mailItem.Subject}");
                Console.WriteLine($"Received: {mailItem.ReceivedTime}");
                Console.WriteLine("---");
            }
        }
    }
}`,
        explanation: "MAPI programming examples in C++ and C# for email operations."
      },
      {
        title: "MAPI Extended Features",
        code: `// Advanced MAPI Operations

// Extended MAPI - Custom Properties
HRESULT SetCustomProperty(LPMESSAGE lpMessage)
{
    HRESULT hr;
    MAPINAMEID nameId = {0};
    LPMAPINAMEID lpNameId = &nameId;
    LPSPropTagArray lpPropTags = NULL;
    
    // Define custom property name
    GUID customGuid = {0x12345678, 0x1234, 0x1234, 
                       {0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0}};
    
    nameId.lpguid = &customGuid;
    nameId.ulKind = MNID_STRING;
    nameId.Kind.lpwstrName = L"CustomProperty";
    
    // Get property tag for custom property
    hr = lpMessage->GetIDsFromNames(1, &lpNameId, MAPI_CREATE, &lpPropTags);
    if (FAILED(hr)) return hr;
    
    // Set property value
    SPropValue prop;
    prop.ulPropTag = CHANGE_PROP_TYPE(lpPropTags->aulPropTag[0], PT_UNICODE);
    prop.Value.lpszW = L"Custom Value";
    
    hr = lpMessage->SetProps(1, &prop, NULL);
    MAPIFreeBuffer(lpPropTags);
    return hr;
}

// MAPI Attachment Handling
HRESULT AddAttachment(LPMESSAGE lpMessage, LPCSTR filename)
{
    HRESULT hr;
    LPATTACH lpAttach = NULL;
    ULONG ulAttachNum;
    
    // Create attachment
    hr = lpMessage->CreateAttach(NULL, 0, &ulAttachNum, &lpAttach);
    if (FAILED(hr)) return hr;
    
    // Set attachment properties
    SPropValue attachProps[2];
    attachProps[0].ulPropTag = PR_ATTACH_METHOD;
    attachProps[0].Value.ul = ATTACH_BY_VALUE;
    
    attachProps[1].ulPropTag = PR_ATTACH_FILENAME;
    attachProps[1].Value.lpszA = (LPSTR)filename;
    
    hr = lpAttach->SetProps(2, attachProps, NULL);
    if (FAILED(hr)) goto cleanup;
    
    // Open file and copy data
    HANDLE hFile = CreateFileA(filename, GENERIC_READ, FILE_SHARE_READ, 
                               NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    if (hFile != INVALID_HANDLE_VALUE)
    {
        LPSTREAM lpStream = NULL;
        hr = lpAttach->OpenProperty(PR_ATTACH_DATA_BIN, &IID_IStream, 
                                    STGM_WRITE, MAPI_CREATE | MAPI_MODIFY, 
                                    (LPUNKNOWN*)&lpStream);
        if (SUCCEEDED(hr))
        {
            // Copy file data to attachment stream
            BYTE buffer[4096];
            DWORD bytesRead, bytesWritten;
            while (ReadFile(hFile, buffer, sizeof(buffer), &bytesRead, NULL) && bytesRead > 0)
            {
                lpStream->Write(buffer, bytesRead, &bytesWritten);
            }
            lpStream->Commit(STGC_DEFAULT);
            lpStream->Release();
        }
        CloseHandle(hFile);
    }
    
    hr = lpAttach->SaveChanges(KEEP_OPEN_READONLY);
    
cleanup:
    if (lpAttach) lpAttach->Release();
    return hr;
}

// MAPI Search and Filtering
HRESULT SearchMessages(LPMAPIFOLDER lpFolder, LPCSTR searchCriteria)
{
    HRESULT hr;
    LPMAPITABLE lpContentsTable = NULL;
    
    // Get contents table
    hr = lpFolder->GetContentsTable(0, &lpContentsTable);
    if (FAILED(hr)) return hr;
    
    // Create restriction for search
    SRestriction restriction;
    restriction.rt = RES_CONTENT;
    restriction.res.resContent.ulFuzzyLevel = FL_SUBSTRING | FL_IGNORECASE;
    restriction.res.resContent.ulPropTag = PR_SUBJECT;
    restriction.res.resContent.lpProp = new SPropValue;
    restriction.res.resContent.lpProp->ulPropTag = PR_SUBJECT;
    restriction.res.resContent.lpProp->Value.lpszA = (LPSTR)searchCriteria;
    
    // Apply restriction
    hr = lpContentsTable->Restrict(&restriction, 0);
    if (FAILED(hr)) goto cleanup;
    
    // Set columns to retrieve
    enum {COL_SUBJECT, COL_FROM, COL_RECEIVED_TIME, NUM_COLS};
    SizedSPropTagArray(NUM_COLS, columns) = {NUM_COLS, 
        {PR_SUBJECT, PR_SENDER_NAME, PR_MESSAGE_DELIVERY_TIME}};
    
    hr = lpContentsTable->SetColumns((LPSPropTagArray)&columns, 0);
    if (FAILED(hr)) goto cleanup;
    
    // Read matching messages
    LPSRowSet lpRows = NULL;
    while (SUCCEEDED(lpContentsTable->QueryRows(10, 0, &lpRows)) && lpRows->cRows > 0)
    {
        for (ULONG i = 0; i < lpRows->cRows; i++)
        {
            printf("Subject: %s\\n", lpRows->aRow[i].lpProps[COL_SUBJECT].Value.lpszA);
            printf("From: %s\\n", lpRows->aRow[i].lpProps[COL_FROM].Value.lpszA);
            // Process other properties...
        }
        FreeProws(lpRows);
    }
    
cleanup:
    delete restriction.res.resContent.lpProp;
    if (lpContentsTable) lpContentsTable->Release();
    return hr;
}

// PowerShell MAPI Example using Outlook COM
# PowerShell script for MAPI operations
$outlook = New-Object -ComObject Outlook.Application
$namespace = $outlook.GetNamespace("MAPI")

# Read emails from Inbox
$inbox = $namespace.GetDefaultFolder(6) # olFolderInbox = 6
foreach ($mail in $inbox.Items) {
    Write-Host "Subject: $($mail.Subject)"
    Write-Host "From: $($mail.SenderName)"
    Write-Host "Received: $($mail.ReceivedTime)"
    Write-Host "---"
}

# Send email
$mail = $outlook.CreateItem(0) # olMailItem = 0
$mail.To = "recipient@example.com"
$mail.Subject = "PowerShell MAPI Test"
$mail.Body = "This email was sent using PowerShell and MAPI"
$mail.Send()

# Create calendar appointment
$appointment = $outlook.CreateItem(1) # olAppointmentItem = 1
$appointment.Subject = "Meeting"
$appointment.Start = Get-Date "2023-12-15 10:00"
$appointment.End = Get-Date "2023-12-15 11:00"
$appointment.Save()`,
        explanation: "Advanced MAPI features including custom properties, attachments, and search."
      }
    ],
    relatedProtocols: ["rpc", "smtp", "imap", "pop3", "exchange"],
    resources: [
      {
        title: "MAPI Documentation - Microsoft",
        url: "https://docs.microsoft.com/en-us/office/client-developer/outlook/mapi/",
        type: "Documentation"
      },
      {
        title: "Exchange Server MAPI Reference",
        url: "https://docs.microsoft.com/en-us/exchange/client-developer/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Authentication and authorization",
      "Encrypted connections",
      "Access control lists",
      "Malware scanning",
      "Data loss prevention",
      "Audit logging"
    ]
};
