/************************************************************************/
/* 以下程序主要用来测试格雷码 
格雷码的产生过程如下：
首先将其右移一位：        >>
然后再与原先的值进行异或: ^                                                                    */
/************************************************************************/

/*
#include <stdio.h>
#include <malloc.h>

#define N 4

void gray_code(int *code);
void main()
{
	int *sign;
	int i;
	sign=(int *)malloc(N*sizeof(int));
	sign[0]=280;
	sign[1]=841;
	sign[2]=56;
	sign[3]=127;
    for (i=0;i<N;i++)
    {
		gray_code(&sign[i]);
		printf("%d\n",sign[i]);

    }
	


}   

void gray_code(int *code)
{
	int a,b;
	a=*code;
	b=a>>1;
	*code=a^b;
}
*/