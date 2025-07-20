using System; // ✅ Required for Console class

public class Logger
{
    private static Logger instance;
    private static readonly object lockObj = new object();

    private Logger()
    {
        Console.WriteLine("Logger Instance Created");
    }

    public static Logger GetInstance()
    {
        lock (lockObj)
        {
            if (instance == null)
            {
                instance = new Logger();
            }
        }
        return instance;
    }

    public void Log(string message)
    {
        Console.WriteLine("[LOG] " + message);
    }
}
class Program
{
    static void Main()
    {
        Logger logger = Logger.GetInstance(); // creates the instance
        logger.Log("This is a test message."); // logs message

        Logger anotherLogger = Logger.GetInstance(); // returns same instance
        anotherLogger.Log("Logging from another reference.");
    }
}