---
title: Rademacher Complexity
description:  An approach to estimate overfitting
layout: post
categories: ML
---

I was sitting with a bunch of grad students in a [data analytics class](http://tw.rpi.edu/web/Courses/DataAnalytics/2015) joking about R package names and ml terminology: e1071, partykit, confusion matrix, artifical nueral network, Perceptron, Belief Nets, Maximum a Posteriori. Take them of context and pretend you don't know what they mean (If you don't you're probably saner), and you'll realize *these words sound really cool*. My vote for coolest name goes to Random Forest, but Confusion Matrix sounds awesome too. Those graduate students and I decided to started nominating these for band names.

 > *Perceptron comes out with it's latest album, Random Forest, featuring its hit single Tangled in the Neural Net*

Thus, I'm writing about Rademacher Complexity because of the cool title. Also, to further the liberation of machine learning knowledge from graduate textbooks.

## Estimating Out-of-Sample Error

RC solves the problem of estimating over-fitting. In a PAC learning scenario, where we pick an Empirical Risk Minimizer $g$, our out of sample error can be thought of as how well we fit our training set with a penalty on how much we overfit.

[1] $E_{out}(g) = E_{in}(g) + overfitpenalty$

The Rademacher penalty estimates the overfit penalty for classification tasks. For a more general estimate, see the [permutation bound](http://www.cs.rpi.edu/~magdon/ps/conference/PermCompNIPS2010.pdf). The insight to the Rademacher penalty is that it estimates the overfit penalty by computing how much we overfit a dataset for which we can compute the optimism.

In a classification task with $n$ classes, we make a copy the data and replace each original label with a label drawn from the "Rademacher Distribution", where each label has an equal chance of being drawn $P (y_n =1/n)$. For binary classification, we're simply reassigning labels to the training set at random with$P(1/2)$. From there, we train the model on that data, minimize the in-sample error, and see how well we fit the noise. We call that error $E_r$.

$\hat E_{out} = E_{in} + (1/n - E_r)$

What's nice about the Rademacher penalty is that it is simple, intuitive, and data dependent. It accounts for how well the training set lends itself t over-fitting. That makes it tighter than the worst-case VC Bound.

$P \left(\text{test error} \leq \text{training error} + \sqrt{h(\log(2N/h)+1)-\log(\eta/4)\over N} \right) = 1 - \eta$

### Other tools

Rademacher Complexity is a good tool for model selection and controlling over-fitting in classification scenarios. It's great because it directly estimates $E_{out}$ without a test set. 

* If you did the same thing using normally distributed variables, it's called the Gaussian Complexity [2].

* You can compute a similar estimate by [permuting the labels of the training data](http://www.cs.rpi.edu/~magdon/ps/conference/PermCompNIPS2010.pdf). It works for regression as well as classification. It's called the permutation estimate and has an associated bound called the Permutation Bound [3].

> Confusion Matrix, new music video *Probably Approximately Correct* goes viral

[1] Abu-Mostafa, Magdon-Ismail, Lin: Nov-2014, Page 30, e-chapter 9, Learning From Data.
[2] Peter L. Bartlett, Shahar Mendelson (2002) Rademacher and Gaussian Complexities: Risk Bounds and Structural Results. Journal of Machine Learning Research 3 463-482
[3] Magdon-Ismail, Permutation Complexity Bound on Out-Sample Error, http://www.cs.rpi.edu/~magdon/ps/conference/PermCompNIPS2010.pdf
