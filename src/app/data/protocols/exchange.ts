import { Protocol } from "../../types/protocol";

export const EXCHANGE: Protocol = {
    id: "exchange",
    name: "Microsoft Exchange",
    category: "Email",
    difficulty: "Advanced",
    shortDescription: "Microsoft Exchange Server protocol suite for enterprise email and collaboration",
    fullDescription: "Microsoft Exchange is a mail server and calendaring server developed by Microsoft. It runs on Windows Server and provides email, calendar, contact, and task management capabilities. Exchange uses various protocols including MAPI, EWS, ActiveSync, and standard email protocols.",
    port: "Multiple (25, 80, 110, 143, 443, 587, 993, 995)",
    versions: ["Exchange 2010", "Exchange 2013", "Exchange 2016", "Exchange 2019", "Exchange Online"],
    advantages: [
      "Integrated with Active Directory",
      "Rich client support",
      "Advanced calendaring",
      "Mobile device support",
      "High availability features",
      "Compliance and archiving",
      "Unified messaging",
      "Cloud integration"
    ],
    disadvantages: [
      "High licensing costs",
      "Complex administration",
      "Windows dependency",
      "Resource intensive",
      "Security vulnerabilities",
      "Upgrade complexity",
      "Vendor lock-in",
      "Storage requirements"
    ],
    useCases: [
      "Enterprise email systems",
      "Corporate calendaring",
      "Unified communications",
      "Mobile email access",
      "Collaboration platforms",
      "Document sharing",
      "Meeting management",
      "Contact management",
      "Task coordination",
      "Business intelligence",
      "Compliance management",
      "Disaster recovery"
    ],
    examples: [
      {
        title: "Exchange Web Services (EWS)",
        code: `// C# EWS client example
using Microsoft.Exchange.WebServices.Data;

public class ExchangeClient
{
    private ExchangeService service;
    
    public void Initialize(string email, string password, string url)
    {
        service = new ExchangeService(ExchangeVersion.Exchange2013_SP1);
        service.Credentials = new NetworkCredential(email, password);
        
        // Autodiscover or explicit URL
        if (string.IsNullOrEmpty(url))
        {
            service.AutodiscoverUrl(email, RedirectionUrlValidationCallback);
        }
        else
        {
            service.Url = new Uri(url);
        }
    }
    
    public void SendEmail(string to, string subject, string body)
    {
        EmailMessage message = new EmailMessage(service);
        message.ToRecipients.Add(to);
        message.Subject = subject;
        message.Body = new MessageBody(BodyType.HTML, body);
        
        message.Send();
    }
    
    public List<EmailMessage> GetInboxMessages(int count = 10)
    {
        FindItemsResults<Item> findResults = service.FindItems(
            WellKnownFolderName.Inbox,
            new ItemView(count)
        );
        
        return findResults.Cast<EmailMessage>().ToList();
    }
    
    public void CreateCalendarEvent(string subject, DateTime start, DateTime end)
    {
        Appointment appointment = new Appointment(service);
        appointment.Subject = subject;
        appointment.Start = start;
        appointment.End = end;
        appointment.ReminderMinutesBeforeStart = 15;
        
        appointment.Save(SendInvitationsMode.SendToNone);
    }
    
    private static bool RedirectionUrlValidationCallback(string redirectionUrl)
    {
        return redirectionUrl.ToLower().StartsWith("https://");
    }
}

// PowerShell Exchange management
Import-Module ExchangeOnlineManagement

# Connect to Exchange Online
Connect-ExchangeOnline -UserPrincipalName admin@company.com

# Get mailbox information
Get-Mailbox -Identity user@company.com | fl

# Set mailbox quota
Set-Mailbox -Identity user@company.com -ProhibitSendQuota 10GB`,
        explanation: "Exchange Web Services client implementation and PowerShell management."
      },
      {
        title: "Exchange Server Configuration",
        code: `# Exchange Server PowerShell Configuration

# Create new mailbox database
New-MailboxDatabase -Name "DB01" -Server "EXCH01" \\
    -EdbFilePath "E:\\Databases\\DB01\\DB01.edb" \\
    -LogFolderPath "E:\\Databases\\DB01\\Logs"

# Mount the database
Mount-Database -Identity "DB01"

# Create new mailbox
New-Mailbox -Name "John Doe" -UserPrincipalName "john.doe@company.com" \\
    -Password (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) \\
    -Database "DB01"

# Configure Client Access Server
Set-OutlookAnywhere -Identity "EXCH01\\Rpc (Default Web Site)" \\
    -ExternalHostname "mail.company.com" \\
    -InternalHostname "exch01.company.local" \\
    -DefaultAuthenticationMethod NTLM \\
    -SSLOffloading $false

# Enable ActiveSync
Set-ActiveSyncVirtualDirectory -Identity "EXCH01\\Microsoft-Server-ActiveSync (Default Web Site)" \\
    -ExternalUrl "https://mail.company.com/Microsoft-Server-ActiveSync"

# Configure OWA
Set-OwaVirtualDirectory -Identity "EXCH01\\owa (Default Web Site)" \\
    -ExternalUrl "https://mail.company.com/owa" \\
    -InternalUrl "https://exch01.company.local/owa"

# High Availability - Database Availability Group
New-DatabaseAvailabilityGroup -Name "DAG01" \\
    -WitnessServer "DC01" \\
    -WitnessDirectory "C:\\DAGWitness"

# Add servers to DAG
Add-DatabaseAvailabilityGroupServer -Identity "DAG01" -MailboxServer "EXCH01"
Add-DatabaseAvailabilityGroupServer -Identity "DAG01" -MailboxServer "EXCH02"

# Add database copy
Add-MailboxDatabaseCopy -Identity "DB01" -MailboxServer "EXCH02"`,
        explanation: "Exchange Server setup and high availability configuration."
      },
      {
        title: "Exchange Autodiscover",
        code: `# Exchange Autodiscover XML Response
<?xml version="1.0" encoding="utf-8"?>
<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
  <Response xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
    <Account>
      <AccountType>email</AccountType>
      <Action>settings</Action>
      <Protocol>
        <Type>EXCH</Type>
        <Server>mail.company.com</Server>
        <SSL>On</SSL>
        <AuthPackage>NTLM</AuthPackage>
      </Protocol>
      <Protocol>
        <Type>EXPR</Type>
        <Server>mail.company.com</Server>
        <SSL>On</SSL>
        <AuthPackage>NTLM</AuthPackage>
        <ASUrl>https://mail.company.com/EWS/Exchange.asmx</ASUrl>
        <EwsUrl>https://mail.company.com/EWS/Exchange.asmx</EwsUrl>
        <OOFUrl>https://mail.company.com/EWS/Exchange.asmx</OOFUrl>
        <UMUrl>https://mail.company.com/EWS/Exchange.asmx</UMUrl>
        <OABUrl>https://mail.company.com/OAB/</OABUrl>
      </Protocol>
    </Account>
  </Response>
</Autodiscover>

# Autodiscover DNS records
_autodiscover._tcp.company.com SRV 0 0 443 mail.company.com
autodiscover.company.com CNAME mail.company.com

# Python Autodiscover client
import requests
import xml.etree.ElementTree as ET

def autodiscover(email, password, domain):
    autodiscover_urls = [
        f"https://autodiscover.{domain}/autodiscover/autodiscover.xml",
        f"https://{domain}/autodiscover/autodiscover.xml",
        f"http://autodiscover.{domain}/autodiscover/autodiscover.xml"
    ]
    
    autodiscover_xml = f"""<?xml version="1.0" encoding="utf-8"?>
    <Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/requestschema/2006">
        <Request>
            <EMailAddress>{email}</EMailAddress>
            <AcceptableResponseSchema>
                http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a
            </AcceptableResponseSchema>
        </Request>
    </Autodiscover>"""
    
    for url in autodiscover_urls:
        try:
            response = requests.post(
                url,
                data=autodiscover_xml,
                auth=(email, password),
                headers={'Content-Type': 'text/xml'},
                timeout=10
            )
            
            if response.status_code == 200:
                return parse_autodiscover_response(response.text)
                
        except requests.exceptions.RequestException:
            continue
    
    return None

def parse_autodiscover_response(xml_data):
    root = ET.fromstring(xml_data)
    # Parse EWS URL and other settings
    return root`,
        explanation: "Exchange Autodiscover service configuration and client implementation."
      }
    ],
    diagrams: [
      {
        src: "/exchange_architecture.png",
        alt: "Exchange Server architecture",
        caption: "Microsoft Exchange Server architecture and component overview"
      },
      {
        src: "/exchange_protocols.jpg",
        alt: "Exchange protocol stack",
        caption: "Exchange Server supported protocols and client access methods"
      }
    ],
    relatedProtocols: ["mapi", "ews", "smtp", "imap", "pop3", "activesync"],
    resources: [
      {
        title: "Exchange Server Documentation",
        url: "https://docs.microsoft.com/en-us/exchange/",
        type: "Documentation"
      },
      {
        title: "Exchange Web Services Reference",
        url: "https://docs.microsoft.com/en-us/exchange/client-developer/web-service-reference/",
        type: "API Reference"
      },
      {
        title: "Exchange PowerShell Commands",
        url: "https://docs.microsoft.com/en-us/powershell/exchange/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Multi-factor authentication",
      "Transport Layer Security",
      "Regular security updates",
      "Access control policies",
      "Data loss prevention",
      "Audit logging",
      "Anti-malware protection",
      "Encryption at rest"
    ]
  }