current state   x   y   next state  output
0               0   0   0           0
0               0   1   0           0
0               1   0   0           0
0               1   1   0           0
1               0   0   0           0
1               0   1   0           1
1               1   0   1           0
1               1   1   1           1


Time     0  1   2   3   4
x        0  1   1   0   1
y        1  0   1   1   0
state    1  1   1   1   0
output   0  0   1   1   0

q(t+1) = q(t) and x

y(t) = q(t) and y