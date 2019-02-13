//排序常用函数
function checkArray(array) {
    if (!array || array.length <= 2) return
}

function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}

/*
 *冒泡排序
 *冒泡排序的原理如下，从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 length - 1 的位置。
 */
function bubble(array) {
    debugger
    checkArray(array)
    for (let i = array.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1)
            }
        }
    }
    return array
}
//该算法的操作次数是一个等差数列 n + (n - 1) + (n - 2) +...+ 1 ，去掉常数项以后得出时间复杂度是 O(n * n)


/*
 *插入排序
 *插入排序的原理如下。第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作。
 */
function insertion(array) {
    debugger
    checkArray(array)
    for (let i = 1; i < array.length; i++) {
        for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
            swap(array, j, j + 1);
        }
    }
    return array
}
//该算法的操作次数是一个等差数列 n + (n - 1) + (n - 2) +...+ 1 ，去掉常数项以后得出时间复杂度是 O(n * n)


/*
 *选择排序
 *选择排序的原理如下。遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作。
 */
function selection(array) {
    debugger
    checkArray(array)
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < array.length; j++) {
            minIndex = array[j] < array[minIndex] ? j : minIndex
        }
        swap(array, i, minIndex);
    }
    return array
}
//该算法的操作次数是一个等差数列 n + (n - 1) + (n - 2) +...+ 1 ，去掉常数项以后得出时间复杂度是 O(n * n)

//归并排序

/*
 *快速排序
 *快排的原理如下。随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。然后将数组以基准值的位置分为两部分，继续递归以上操作。
 */

function sort(array) {
    checkArray(array)
    quickSort(array, 0, array.length - 1)
    return array
}

function quickSort(array, left, right) {
    if (left < right) {
        swap(array, 0, right)
        // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
        let indexs = part(array, parseInt(Math.random() * (right - left + 1)) + left, right);
        quickSort(array, left, indexs[0]);
        quickSort(array, indexs[1] + 1, right);
    }
}

function part(array, left, right) {
    let less = left - 1;
    let more = right;
    while (left < more) {
        if (array[left] < array[right]) {
            // 当前值比基准值小，`less` 和 `left` 都加一
            ++less;
            ++left;
        } else if (array[left] > array[right]) {
            // 当前值比基准值大，将当前值和右边的值交换
            // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
            swap(array, --more, left);
        } else {
            // 和基准值相同，只移动下标
            left++;
        }
    }
    // 将基准值和比基准值大的第一个值交换位置
    // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
    swap(array, right, more);
    return [less, more];
}