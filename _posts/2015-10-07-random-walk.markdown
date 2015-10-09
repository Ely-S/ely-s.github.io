---
layout: post
title:  "Testing the Random-walk Hypothesis with a Dickey-Fuller Test"
date:   2015-10-07 13:02:22
categories: stats econometrics
---
	
I came across [this excellent article](http://www.turingfinance.com/hacking-the-random-walk-hypothesis
) on using NIST tests designed for random number generators to investigate the random-walk hypothesis in the stock market. 

It reminded me of other ways to test for random walks from Econometrics.

## The Dickey-Fuller Test

Suppose you model a time series with an autoregressive model.

$$y_t = \beta y_{-t} + u_t$$

where  $y_t $ is the value of $y$ at time $t$, $\beta$ is a constant and $u_t$ is the random error term. Then the processes is called a random-walk if $\beta=1$, because then it's next move only depends on the random error term. This hypothesis test is conducted under the null-hypothesis that $\beta=1$. If we fail to reject the null hypothesis, it is said that there is a "unit autoregressive root" or just "unit root".

This is a very simplistic test. Some other tests for a unit root are the [Augmented Dickey-Fuller](https://en.wikipedia.org/wiki/Augmented_Dickey%E2%80%93Fuller_test) and the [Phillips–Perron](https://en.wikipedia.org/wiki/Phillips%E2%80%93Perron_test) tests.

## Estimation Problems

A unit root can cause estimation problems because it implies that the underlying distribution is [non-stationary](https://en.wikipedia.org/wiki/Stationary_process), since the variance increases over time. If $\beta = 1$ in the following model,

$$y_t = \beta y_{-t} + u_t = y_{t-1} + u_t$$

then

$$y_t = y_0 \sum_{j=1}^t u_t$$

The variance is given by

$$\operatorname{Var}(y_t) = \sum_{j=1}^t \sigma^2=t \sigma^2$$

The variance diverges to infinite with time. When the stochastic process is non-stationary, OLS can produce invalid results despite high t-statistics and $R^2$. [Granger and Newbold](http://wolfweb.unr.edu/~zal/STAT758/Granger_Newbold_1974.pdf) called such results "spurrious regressions."

## Notes

This was my first technical post! I'll follow up with example code and more time-series techniques.

## References

Dicky and Fuller [https://www.jstor.org/stable/2286348?&seq=1](https://www.jstor.org/stable/2286348?&seq=1)

Granger and Newbold [http://wolfweb.unr.edu/~zal/STAT758/Granger\_Newbold\_1974.pdf](http://wolfweb.unr.edu/~zal/STAT758/Granger\_Newbold\_1974.pdf)

Also [Stata documentation for the Dickey-Fullet test](http://www.stata.com/manuals13/tsdfuller.pdf)
