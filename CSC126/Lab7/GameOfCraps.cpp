#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main()
{
    srand(time(0));
    int totalGames = 10000;
    int playerWins = 0, playerLoses = 0;

    for (int i = 0; i < totalGames; i++)
    {
        int randDice1, randDice2;
        int diceSum;

        // obtain the first dice number
        randDice1 = rand() % 6 + 1;
        // obtain the second dice number
        randDice2 = rand() % 6 + 1;
        // calculate the sum
        diceSum = randDice1 + randDice2;
        // come-out roll
        // cout << "Come-out roll: " << endl;
        // cout << "The first dice: " << randDice1 << endl;
        // cout << "The second dice: " << randDice2 << endl;
        if (diceSum == 7 || diceSum == 11)
        {
            // cout << "You win!" << endl;
            playerWins++;
        }
        else if (diceSum == 2 || diceSum == 3 || diceSum == 12)
        {
            // cout << "You lose!" << endl;
            playerLoses++;
        }
        else
        {
            int point = diceSum;
            // cout << "The point: " << point << endl;
            // cout << "=====================================" << endl;
            do
            {
                randDice1 = rand() % 6 + 1;
                randDice2 = rand() % 6 + 1;
                // cout << "The first dice: " << randDice1 << endl;
                // cout << "The second dice: " << randDice2 << endl;

                diceSum = randDice1 + randDice2;
                if (diceSum == point)
                {
                    // cout << "Dice sum: " << diceSum << endl;
                    // cout << "You win!" << endl;
                    playerWins++;
                }
                else if (diceSum == 7)
                {
                    // cout << "Dice sum: " << diceSum << endl;
                    // cout << "You lose!" << endl;
                    playerLoses++;
                }

            } while (diceSum != point && diceSum != 7);
        }
    }

    cout << playerWins << " " << playerLoses << endl;
    double winRate = (double)playerWins / totalGames;
    cout << "Player win Rate: " << winRate * 100 << "%" << endl;
    return 0;
}