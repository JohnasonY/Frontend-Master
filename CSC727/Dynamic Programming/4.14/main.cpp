const float p = 1/2, q = 1/2;

/**
 * Cal the prob A wins that A needs i games to win and B needs j games to win
 */
float P_recursive(int i, int j) {
    if (i == 0)
        return 1;
    else if (j == 0)
        return 0;
    else {
        return p * P_recursive(i-1, j) + q * P_recursive(i, j -1);
    }
}

void P_iter(int i, int j) {
}

/**
 * item     weight      value
 * 0        3            50
 * 1        4            40
 * 2        5            10
 * 3        6            30
 * 
 * maximum weight = 10
 */

/**
 * return the max value for the previous ith items
 */
int T(int i, int j) {
    
}

/**
 * i: numner of items considered
 * j: current capacity of the knapsack (0 - n)
 * 
 * T(i, j) = 
 * T(i-1, j), j < weight(i)
 * max(value(i) + T(i-1, j - weight(i)), T(i-1, j)), j >= weight(i)
 */

 /**
  * n = coins
  * P(H) = p
  * P(T) = 1-p
  * B(n) = probability that an even # of heads are observed
  * B(0) = 1
  * B(1) = 1-p
  * B(n) = (1-p)B(n-1) + p(1-B(n-1))
  *      = B(n-1) - pB(n-1) + p - pB(n-1)
  *      = B(n-1)(1-2p) + p
  * 
  * 
  */
 float even(int n, float p) {
    if (n==0) return 1;
    else if (n==1) return 1-p;
    else return (even(n-1, p) * (1-2*p)+ p);
 }


 /**
  * input of size n
  * t(n) = N*logN
  * 
  */

