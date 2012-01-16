using System.IO;
using System.Threading;

namespace VTCO.Utils
{
    /// <summary>
    /// Write Log
    /// </summary>
    public class Log
    {
        public static void WriteLog(string message)
        {
            var fileLog = Config.Global.Settings.LOG_PATH + "log_" + System.DateTime.Now.ToString("MM_dd_yyyy") + ".txt";
            message = "\r\nTime: " + System.DateTime.Now.ToString("MM/dd/yyyy h:mm tt") + "\r\n" + message + "\r\n----------------------------------------------------";
            FileStream fs = new FileStream(fileLog, FileMode.OpenOrCreate, FileAccess.ReadWrite);
            StreamWriter sw = new StreamWriter(fs);
            try
            {


                sw.Close();
                fs.Close();

                // Ghi file
                fs = new FileStream(fileLog, FileMode.Append, FileAccess.Write);
                sw = new StreamWriter(fs);
                sw.Write(message);
                sw.Close();
                fs.Close();

            }
            catch
            {
                sw.Close();
                fs.Close();
            }
            finally
            {
                sw.Close();
                fs.Close();
            }

        }
    }
}
