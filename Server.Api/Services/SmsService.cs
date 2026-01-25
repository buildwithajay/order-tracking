using Microsoft.Extensions.Options;
using Server.Api.Configurations;
using Server.Api.Interfaces;
using Twilio;

namespace Server.Api.Services;

public class SmsService : ISmsService
{
    private readonly TwilioSettings _settings;

    public SmsService(IOptions<TwilioSettings> settings)
    {
        _settings = settings.Value;

        TwilioClient.Init(
            _settings.AccountSid,
            _settings.AuthToken
        );
    }

    public async Task SendSmsAsync(string number, string message)
    {
        await Twilio.Rest.Api.V2010.Account.MessageResource.CreateAsync(
            body: message,
            from: new Twilio.Types.PhoneNumber(_settings.FromPhone),
            to: new Twilio.Types.PhoneNumber(number)
        );
    }
}