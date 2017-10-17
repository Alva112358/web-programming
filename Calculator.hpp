#ifndef _CALCULATOR_
#define _CALCULATOR_
#include <iostream>
#include <string>
#include <stack>
using namespace std;

class Calculator {
public:
	Calculator();
	Calculator(const string& expression);
	string infixToPostfix(string &infix);
	string getExpression();
	double postfixCalculate(string &postfix);
	double Calculate(string &infix);
	double getResult();
	bool isBrackMatching(string &expression);
	bool isExistingOtherSymbol(string &expression);
	bool checkExpress(string &expression);
public:
	string expression;
	double result;
};

#endif //_CALCULATOR_