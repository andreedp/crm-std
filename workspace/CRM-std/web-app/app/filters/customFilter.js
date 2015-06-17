define(['filters/filters'], function(filters) {
	filters.filter('customFilter', ['$filter', '$parse', function ($filter, $parse) {
        var filterFilter = $filter('filter');
        var standardComparator = function standardComparator(obj, text) {
            text = ('' + text).toLowerCase();
            return ('' + obj).toLowerCase().indexOf(text) > -1;
        };

        return function customFilter(array, expression) {
            function customComparator(actual, expected) {

                var isBeforeActivated = expected.before;
                var isAfterActivated = expected.after;
                var isLower = expected.lower;
                var isHigher = expected.higher;
                var higherLimit;
                var lowerLimit;
                var itemDate;
                var queryDate;


                if (angular.isObject(expected)) {

                    //date range
                    if (expected.before || expected.after) {
                        try {
                            if (isBeforeActivated) {
                                higherLimit = expected.before;

                                itemDate = new Date(actual);
                                queryDate = new Date(higherLimit);

                                if (itemDate > queryDate) {
                                    return false;
                                }
                            }

                            if (isAfterActivated) {
                                lowerLimit = expected.after;


                                itemDate = new Date(actual);
                                queryDate = new Date(lowerLimit);

                                if (itemDate < queryDate) {
                                    return false;
                                }
                            }

                            return true;
                        } catch (e) {
                            return false;
                        }

                    } else if (isLower || isHigher) {
                        //number range
                        if (isLower) {
                            higherLimit = expected.lower;

                            if (actual > higherLimit) {
                                return false;
                            }
                        }

                        if (isHigher) {
                            lowerLimit = expected.higher;
                            if (actual < lowerLimit) {
                                return false;
                            }
                        }

                        return true;
                    }
                    //etc

                    return true;

                }
                return standardComparator(actual, expected);
            }

            angular.forEach(expression, function(value, key) {
              if (key.indexOf('.') != -1) {
                var input = value;
                angular.forEach(array, function(row) {
                  if (!row[key]) {
                    var valid = true;
                    var getter = $parse(key);
                    var value = getter(row);
                    if (input && input != '') {
                      row[key] = value;
                    }
                  }
                });
      
              }
            });



            var output = filterFilter(array, expression, customComparator);
            return output;
        };
    }]);
});