module.exports.helpers = function() {
  return {
    toArray: function(str) {
      let jsonArray = eval("(function(){return " + str + ";})()");
      return jsonArray;
    },
    getJsonContext: function(data, options) {
      return options.fn(JSON.parse(data));
    },
    compare: function(lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

      let operator = options.hash.operator || "==";

      let operators = {
        "==": function(l, r) {
          return l == r;
        },
        "===": function(l, r) {
          return l === r;
        },
        "!=": function(l, r) {
          return l != r;
        },
        "<": function(l, r) {
          return l < r;
        },
        ">": function(l, r) {
          return l > r;
        },
        "<=": function(l, r) {
          return l <= r;
        },
        ">=": function(l, r) {
          return l >= r;
        },
        "typeof": function(l, r) {
          return typeof l == r;
        },
      };

      if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

      let result = operators[operator](lvalue, rvalue);

      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }

    },
    stringify: function(obj) {
      return JSON.stringify(obj);
    },
    toInteger: function(value) {
      let newValue = value.replace(/\./g, "").replace(/\,/g, "");
      return Number(newValue);
    },
    concat: function(val1, val2) {
      return val1 + val2;
    },
    times: function(n, block) {
      let accum = "";
      for (let i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.indexPoll = i + 1;
        block.data.index1 = i + 1;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        block.data.odd = i % 2 === 1;
        accum += block.fn(this);
      }
      return accum;
    },
    safeVal: function(value, safeValue) {
      let out = value || safeValue;
      return new Handlebars.SafeString(out);
    },
    and: function(v1, v2) {
      return v1 && v2;
    },
    or: function(v1, v2) {
      return v1 || v2;
    }
  };
};