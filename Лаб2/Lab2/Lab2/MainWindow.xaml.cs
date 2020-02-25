using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;



namespace WpfApp26
{

    public class Point2D
    {
        private double x;
        private double y;

        public Point2D()
        {
            x = 0;
            y = 0;
        }

        public void SetX(double x)
        {
            this.x = x;
        }

        public void SetY(double y)
        {
            this.y = y;
        }

        public double GetX()
        {
            return x;
        }
        public double GetY()
        {
            return y;
        }

        public void ShiftX(double value)
        {
            x = x + value;
        }
        public void ShiftY(double value)
        {
            y = y + value;
        }

        public double GetDistance(Point2D otherpoint)
        {
            double distance = otherpoint.x + otherpoint.y - (x + y);
            return distance;
        }
    }


    public partial class MainWindow : Window
    {
        Point2D point1 = new Point2D();
        Random rnd = new Random();

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {

            point1.SetX(rnd.Next(1, 9));
            point1.SetY(rnd.Next(1, 9));


        }

        void drawPoint(Point2D p)
        {
            Ellipse el = new Ellipse;




            can.Children.Add(el);
        }
    }
}
