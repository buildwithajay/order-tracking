namespace Server.Api.Interfaces;

public interface ISmsService
{
    Task SendSmsAsync(string number, string message);
}