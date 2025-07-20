using System;

class Program
{
    public static double PredictFutureValue(int years, double currentValue, double growthRate)
    {
        if (years == 0)
            return currentValue;

        return PredictFutureValue(years - 1, currentValue, growthRate) * (1 + growthRate);
    }

    public static double PredictFutureValueMemo(int years, double currentValue, double growthRate, double[] memo)
    {
        if (years == 0)
            return currentValue;
        if (memo[years] != 0)
            return memo[years];

        memo[years] = PredictFutureValueMemo(years - 1, currentValue, growthRate, memo) * (1 + growthRate);
        return memo[years];
    }

    static void Main()
    {
        double initialAmount = 10000;         
        double annualGrowthRate = 0.08;       
        int forecastYears = 10;               

        Console.WriteLine("Recursive Forecast:-");
        double futureValue = PredictFutureValue(forecastYears, initialAmount, annualGrowthRate);
        Console.WriteLine($"Future Value after {forecastYears} years: ₹{futureValue:F2}");

        Console.WriteLine("\nOptimized (Memoized) Forecast:-");
        double[] memo = new double[forecastYears + 1];
        double futureValueOptimized = PredictFutureValueMemo(forecastYears, initialAmount, annualGrowthRate, memo);
        Console.WriteLine($"Future Value after {forecastYears} years: ₹{futureValueOptimized:F2}");

        Console.WriteLine("Yearly Forecast Summary:-");
        for (int year = 1; year <= forecastYears; year++)
        {
            double value = PredictFutureValue(year, initialAmount, annualGrowthRate);
            Console.WriteLine($"Year {year}: ₹{value:F2}");
        }
    }
}