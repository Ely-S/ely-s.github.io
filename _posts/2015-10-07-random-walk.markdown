---
layout: post
title:  "Testing the Random-walk Hypothesis with a Dickey-Fuller Test"
date:   2015-10-07 13:02:22
categories: stats econometrics
---

I came across this excellent article on using NIST tests designed for random number generators to investigate the random-walk hypothesis in the stock market. http://www.turingfinance.com/hacking-the-random-walk-hypothesis

It got me thinking about other ways to approach this and I remembered a test from Econometrics.

## The Dickey-Fuller Test

Suppose you model a time series with an autoregressive model.

$$y_t = \beta y_{-t} + u_t$$

where  $y_t $ is the value of $y$ at time $t$, $\beta$ is a constant and $u_t$ is the random error term. Then the processes is called a random-walk if $\beta=1$, because then it's next move only depends on the random error term. This hypothesis test is conducted under the null-hypothesis that $\beta=1$. If we fail to reject the null hypothesis, it is said that there is a "unit autoregressive root" or just "unit root".

Other tests for a unit root are the Augmented Dickey-Fuller and the Phillips–Perron test.

## Estimation Problems

A unit root can cause estimation problems because it implies that the underlying distribution is [non-stationary](https://en.wikipedia.org/wiki/Stationary_process), since the variance increases over time. If beta is one in the following model,

$$y_t = \beta y_{-t} + u_t = y_{t-1} + u_t$$

then

$$y_t = y_0 \sum_{j=1}^t u_t$$

The variance is given by

$$\operatorname{Var}(y_t) = \sum_{j=1}^t \sigma^2=t \sigma^2$$

The variance diverges to infinite with time. When the stochastic process is non-stationary, OLS can produce invalid results despite high t-statistics and $R^2$. [Granger and Newbold](http://wolfweb.unr.edu/~zal/STAT758/Granger_Newbold_1974.pdf) called such results "spurrious regressions."



References

Dicky Fuller https://www.jstor.org/stable/2286348?&seq=1

Granger http://wolfweb.unr.edu/~zal/STAT758/Granger_Newbold_1974.pdf