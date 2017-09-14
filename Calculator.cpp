/*-----------------------Calculator Version 1.0------------------------*/
/*--The calculator can only process the calculate of '+','-','*','/'---*/
/*--Negative number cannot be process yet------------------------------*/
#include "Calculator.hpp"

Calculator::Calculator() {
	result = 0;
}

Calculator::Calculator(const string& expression) {
	this->expression = expression;
	result = Calculate(this->expression);
}

string Calculator::getExpression() {
	if(!checkExpress()) {
		return "ERROR!"
	}
	return expression;
}

double Calculator::getResult() {
	return result;
}

/*---------------------The Code of Calculating the Result------------------------*/
string Calculator::infixToPostfix(string &infix) {
	string postfix;
	stack<char> m_stack;
	for(int i = 0 ; i < infix.size() ; i++) {
		if(infix[i] >= '0' && infix[i] <= '9' || infix[i] == '.') {
			postfix += infix[i];
			if(i == infix.size()-1 || !(infix[i+1] >= '0' && infix[i+1] <= '9' || infix[i+1] == '.')) {
				postfix += '#';
			}
		}

		else if(infix[i] == ')') {
			while(m_stack.top() != '(') {
				postfix += m_stack.top();
				m_stack.pop();
			}
			m_stack.pop();
		}

		else if(infix[i] == '(') {
			m_stack.push(infix[i]);
		}

		else {
			if(m_stack.empty() || m_stack.top() == '(') {
				m_stack.push(infix[i]);
			}

			else {                                                               
				if(infix[i] == '+' || infix[i] == '-') {
					while(!m_stack.empty() && m_stack.top() != '(') {
						postfix += m_stack.top();
						m_stack.pop();
					}
					m_stack.push(infix[i]);
				}

				else if(infix[i] == '*' || infix[i] == '/') {
					while(!m_stack.empty() && m_stack.top() != '(' && m_stack.top() != '+' && m_stack.top() != '-') {
						postfix += m_stack.top();
						m_stack.pop();
					}
					m_stack.push(infix[i]);
				}
			}
		}
	}

	while(!m_stack.empty()) {
		postfix += m_stack.top();
		m_stack.pop();
	}

	return postfix;
}

double Calculator::postfixCalculate(string &postfix) {
	stack<double> numberStore;
	string temp;
	int numberTag = -1;
	for(int i = 0 ; i < postfix.size() ; i++) {
		if(postfix[i] >= '0' && postfix[i] <= '9' || postfix[i] == '.') {
			temp += postfix[i];
		}

		else if(postfix[i] == '#') {
			numberStore.push(atof(temp.c_str()));
			temp = "";
		}

		else {
			double numberOne = numberStore.top();
			numberStore.pop();
			double numberTwo = numberStore.top();
			numberStore.pop();

			if(postfix[i] == '+') {
				numberStore.push(numberOne+numberTwo);
			}

			else if(postfix[i] == '-') {
				numberStore.push(numberTwo-numberOne);
			}

			else if(postfix[i] == '*') {
				numberStore.push(numberOne*numberTwo);
			}

			else if(postfix[i] == '/') {
				numberStore.push(numberTwo/numberOne);
			}
		}
	}

	return numberStore.top();
}

double Calculator::Calculate(string &infix) {
	string postfix = infixToPostfix(infix);
	return postfixCalculate(postfix);
}

/*---------------------The Code of Calculating the Result------------------------*/


/*--------------------Check whether the expression is valid.---------------------*/
bool Calculator::isBrackMatching(string &expression) {
	stack<char> m_stack;
	for(int i = 0 ; i < expression.size() ; i++) {
		if(expression[i] == '(') {
			m_stack.push('(');
		}

		else if(expression[i] == ')') {
			m_stack.pop();
		}
	}

	return m_stack.empty();
}

bool Calculator::isExistingOtherSymbol(string &expression) {
	for(int i = 0 ; i < expression.size() ; i++) {
		if(!(expression[i] >= '0' && expression[i] <= '9' || expression[i] == '(' || expression[i] == ')' 
			|| expression[i] == '+' || expression[i] == '-' || expression[i] == '*' || expression[i] == '/' || expression[i] == '.')) {
			return true;
		}
	}
	return false;
}

bool Calculator::checkExpress(string &expression) {
	return !isExistingOtherSymbol(expression) && isBrackMatching(expression);
}

/*--------------------Check whether the expression is valid.---------------------*/