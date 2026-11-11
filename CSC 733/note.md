Token: One occurance of a unit in running text
Vocabulary: The set of distinct types available to the system (the set of all types)
Type: Unique vocabulary item
Morpheme: Minimal meaning-bearing unit
e.x. cat dog cat
3 tokens and 2 vocabulary items (types)
vocabulary: {cat, dog}

The chain rule for producing the next token:
P()

Markov approximation
Bigram: P(wi | w1, w2, w3, ...., wi-1) approx = P(wi | wi-1)

Unigram: no context
bigram: 1 previous
Trigram: 2 previous
