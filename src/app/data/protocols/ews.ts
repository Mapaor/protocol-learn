import { Protocol } from "../../types/protocol";

export const EWS: Protocol = {
    id: "ews",
    name: "EWS",
    category: "Email",
    difficulty: "Advanced",
    shortDescription: "Exchange Web Services for email and calendar integration",
    fullDescription: "Exchange Web Services (EWS) is a cross-platform API that enables applications to communicate with Microsoft Exchange Server. It provides access to email, calendar, contacts, and tasks through SOAP-based web services, allowing programmatic interaction with Exchange mailboxes.",
    port: "443 (HTTPS)",
    versions: ["EWS 2007", "EWS 2010", "EWS 2013", "EWS 2016", "EWS 2019"],
    advantages: [
      "Rich Exchange integration",
      "Cross-platform compatibility",
      "SOAP-based standard",
      "Comprehensive API coverage",
      "Real-time notifications",
      "Impersonation support",
      "Autodiscovery service",
      "Streaming notifications"
    ],
    disadvantages: [
      "Complex implementation",
      "Performance overhead",
      "Throttling limitations",
      "Version compatibility",
      "Authentication complexity",
      "Large XML payloads",
      "Limited by Exchange policies",
      "Debugging difficulties"
    ],
    useCases: [
      "Email client applications",
      "Calendar synchronization",
      "Mobile email apps",
      "Third-party integrations",
      "Workflow automation",
      "Backup solutions",
      "Migration tools",
      "Compliance applications",
      "CRM integration",
      "Business intelligence",
      "Archiving systems",
      "Custom email solutions"
    ],
    examples: [
      {
        title: "EWS SOAP Request Example",
        code: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"
               xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages">
  <soap:Header>
    <t:RequestServerVersion Version="Exchange2013" />
    <t:ExchangeImpersonation>
      <t:ConnectingSID>
        <t:PrimarySmtpAddress>user@example.com</t:PrimarySmtpAddress>
      </t:ConnectingSID>
    </t:ExchangeImpersonation>
  </soap:Header>
  <soap:Body>
    <m:FindItem Traversal="Shallow">
      <m:ItemShape>
        <t:BaseShape>IdOnly</t:BaseShape>
        <t:AdditionalProperties>
          <t:FieldURI FieldURI="item:Subject" />
          <t:FieldURI FieldURI="message:From" />
          <t:FieldURI FieldURI="item:DateTimeReceived" />
        </t:AdditionalProperties>
      </m:ItemShape>
      <m:ParentFolderIds>
        <t:DistinguishedFolderId Id="inbox" />
      </m:ParentFolderIds>
    </m:FindItem>
  </soap:Body>
</soap:Envelope>`,
        explanation: "EWS SOAP request to find items in the inbox folder."
      },
      {
        title: "EWS C# Client Example",
        code: `using Microsoft.Exchange.WebServices.Data;

public class EWSClient
{
    private ExchangeService service;
    
    public EWSClient(string email, string password, string domain = null)
    {
        service = new ExchangeService(ExchangeVersion.Exchange2013);
        
        if (string.IsNullOrEmpty(domain))
        {
            service.Credentials = new WebCredentials(email, password);
        }
        else
        {
            service.Credentials = new WebCredentials(email, password, domain);
        }
        
        // Autodiscover service URL
        service.AutodiscoverUrl(email, RedirectionUrlValidationCallback);
    }
    
    public void SendEmail(string to, string subject, string body)
    {
        EmailMessage email = new EmailMessage(service);
        email.ToRecipients.Add(to);
        email.Subject = subject;
        email.Body = new MessageBody(BodyType.HTML, body);
        
        email.Send();
    }
    
    public List<EmailMessage> GetInboxMessages(int count = 10)
    {
        ItemView view = new ItemView(count);
        
        FindItemsResults<Item> findResults = service.FindItems(
            WellKnownFolderName.Inbox, view);
        
        List<EmailMessage> messages = new List<EmailMessage>();
        foreach (Item item in findResults.Items)
        {
            if (item is EmailMessage)
            {
                EmailMessage message = item as EmailMessage;
                message.Load(new PropertySet(ItemSchema.Subject, 
                    ItemSchema.DateTimeReceived, EmailMessageSchema.From));
                messages.Add(message);
            }
        }
        
        return messages;
    }
    
    public void CreateAppointment(string subject, DateTime start, DateTime end)
    {
        Appointment appointment = new Appointment(service);
        appointment.Subject = subject;
        appointment.Start = start;
        appointment.End = end;
        appointment.ReminderMinutesBeforeStart = 15;
        
        appointment.Save(WellKnownFolderName.Calendar, 
            SendInvitationsMode.SendToNone);
    }
    
    private static bool RedirectionUrlValidationCallback(string redirectionUrl)
    {
        return redirectionUrl.ToLower().StartsWith("https://");
    }
}`,
        explanation: "C# EWS client implementation using Exchange Web Services Managed API."
      },
      {
        title: "EWS PowerShell Integration",
        code: `# Import EWS Managed API
Add-Type -Path "C:\\Program Files\\Microsoft\\Exchange\\Web Services\\2.2\\Microsoft.Exchange.WebServices.dll"

# Create Exchange Service
$service = New-Object Microsoft.Exchange.WebServices.Data.ExchangeService([Microsoft.Exchange.WebServices.Data.ExchangeVersion]::Exchange2013)

# Set credentials
$service.Credentials = New-Object Microsoft.Exchange.WebServices.Data.WebCredentials("user@domain.com", "password")

# Autodiscover
$service.AutodiscoverUrl("user@domain.com")

# Get calendar appointments
$calendarView = New-Object Microsoft.Exchange.WebServices.Data.CalendarView([DateTime]::Now, [DateTime]::Now.AddDays(7))
$appointments = $service.FindAppointments([Microsoft.Exchange.WebServices.Data.WellKnownFolderName]::Calendar, $calendarView)

foreach ($appointment in $appointments) {
    $appointment.Load()
    Write-Host "Subject: $($appointment.Subject)"
    Write-Host "Start: $($appointment.Start)"
    Write-Host "End: $($appointment.End)"
    Write-Host "---"
}

# Send email
$email = New-Object Microsoft.Exchange.WebServices.Data.EmailMessage($service)
$email.ToRecipients.Add("recipient@domain.com")
$email.Subject = "Test Email from PowerShell"
$email.Body = "This is a test email sent via EWS PowerShell"
$email.Send()

# Create contact
$contact = New-Object Microsoft.Exchange.WebServices.Data.Contact($service)
$contact.GivenName = "John"
$contact.Surname = "Doe"
$contact.EmailAddresses[[Microsoft.Exchange.WebServices.Data.EmailAddressKey]::EmailAddress1] = "john.doe@example.com"
$contact.Save([Microsoft.Exchange.WebServices.Data.WellKnownFolderName]::Contacts)`,
        explanation: "PowerShell script for EWS operations including email, calendar, and contacts."
      }
    ],
    diagrams: [
      {
        src: "/ews_architecture.png",
        alt: "EWS architecture",
        caption: "Exchange Web Services architecture and integration points"
      },
      {
        src: "/ews_operations.jpg",
        alt: "EWS operations",
        caption: "Common EWS operations and data flow"
      }
    ],
    relatedProtocols: ["soap", "https", "xml", "oauth2"],
    resources: [
      {
        title: "EWS Managed API Documentation",
        url: "https://docs.microsoft.com/en-us/exchange/client-developer/web-service-reference/web-services-reference-for-exchange",
        type: "Documentation"
      },
      {
        title: "EWS Schema Reference",
        url: "https://docs.microsoft.com/en-us/exchange/client-developer/web-service-reference/ews-xml-elements-in-exchange",
        type: "Reference"
      },
      {
        title: "Exchange Development",
        url: "https://docs.microsoft.com/en-us/exchange/client-developer/",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "OAuth 2.0 authentication",
      "Certificate validation",
      "Throttling policies",
      "Impersonation permissions",
      "Data encryption",
      "Access logging",
      "API rate limiting",
      "Sensitive data handling"
    ]
  }