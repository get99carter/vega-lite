"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
var data_1 = require("../../../src/compile/data");
var lookup_1 = require("../../../src/compile/data/lookup");
var parse_1 = require("../../../src/compile/data/parse");
var log = tslib_1.__importStar(require("../../../src/log"));
var util_1 = require("../../util");
describe('compile/data/lookup', function () {
    it('should parse lookup from array', function () {
        var model = util_1.parseUnitModel({
            'data': { 'url': 'data/lookup_groups.csv' },
            'transform': [{
                    'lookup': 'person',
                    'from': {
                        'data': { 'url': 'data/lookup_people.csv' },
                        'key': 'name',
                        'fields': ['age', 'height']
                    }
                }],
            'mark': 'bar',
            'encoding': {}
        });
        var t = parse_1.parseTransformArray(null, model, new data_1.AncestorParse);
        chai_1.assert.deepEqual(t.assemble(), {
            type: 'lookup',
            from: 'lookup_0',
            key: 'name',
            fields: ['person'],
            values: ['age', 'height']
        });
    });
    it('should create node for flat lookup', function () {
        var lookup = new lookup_1.LookupNode(null, {
            'lookup': 'person',
            'from': {
                'data': { 'url': 'data/lookup_people.csv' },
                'key': 'name',
                'fields': ['age', 'height']
            }
        }, 'lookup_0');
        chai_1.assert.deepEqual(lookup.assemble(), {
            type: 'lookup',
            from: 'lookup_0',
            key: 'name',
            fields: ['person'],
            values: ['age', 'height']
        });
    });
    it('should create node for nested lookup', function () {
        var lookup = new lookup_1.LookupNode(null, {
            'lookup': 'person',
            'from': {
                'data': { 'url': 'data/lookup_people.csv' },
                'key': 'name'
            },
            'as': 'foo'
        }, 'lookup_0');
        chai_1.assert.deepEqual(lookup.assemble(), {
            type: 'lookup',
            from: 'lookup_0',
            key: 'name',
            fields: ['person'],
            as: ['foo']
        });
    });
    it('should warn if fields are not specified and as is missing', log.wrap(function (localLogger) {
        var lookup = new lookup_1.LookupNode(null, {
            'lookup': 'person',
            'from': {
                'data': { 'url': 'data/lookup_people.csv' },
                'key': 'name'
            }
        }, 'lookup_0');
        lookup.assemble();
        chai_1.assert.equal(localLogger.warns[0], log.message.NO_FIELDS_NEEDS_AS);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9va3VwLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2NvbXBpbGUvZGF0YS9sb29rdXAudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNEI7QUFDNUIsa0RBQXdEO0FBQ3hELDJEQUE0RDtBQUM1RCx5REFBb0U7QUFDcEUsNERBQXdDO0FBRXhDLG1DQUEwQztBQUUxQyxRQUFRLENBQUMscUJBQXFCLEVBQUU7SUFDOUIsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ25DLElBQU0sS0FBSyxHQUFHLHFCQUFjLENBQUM7WUFDM0IsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFDO1lBQ3pDLFdBQVcsRUFBRSxDQUFDO29CQUNaLFFBQVEsRUFBRSxRQUFRO29CQUNsQixNQUFNLEVBQUU7d0JBQ04sTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFDO3dCQUN6QyxLQUFLLEVBQUUsTUFBTTt3QkFDYixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO3FCQUM1QjtpQkFDRixDQUFDO1lBQ0YsTUFBTSxFQUFFLEtBQUs7WUFDYixVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUMsQ0FBQztRQUVILElBQU0sQ0FBQyxHQUFHLDJCQUFtQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxvQkFBYSxDQUFDLENBQUM7UUFDOUQsYUFBTSxDQUFDLFNBQVMsQ0FBcUIsQ0FBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNoRSxJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxVQUFVO1lBQ2hCLEdBQUcsRUFBRSxNQUFNO1lBQ1gsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0NBQW9DLEVBQUU7UUFDdkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxtQkFBVSxDQUFDLElBQUksRUFBRTtZQUNoQyxRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUU7Z0JBQ04sTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFDO2dCQUN6QyxLQUFLLEVBQUUsTUFBTTtnQkFDYixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO2FBQzVCO1NBQ0YsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVqQixhQUFNLENBQUMsU0FBUyxDQUFvQixNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDckQsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsVUFBVTtZQUNoQixHQUFHLEVBQUUsTUFBTTtZQUNYLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNsQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3pDLElBQU0sTUFBTSxHQUFHLElBQUksbUJBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDaEMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsTUFBTSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBQztnQkFDekMsS0FBSyxFQUFFLE1BQU07YUFDZDtZQUNELElBQUksRUFBRSxLQUFLO1NBQ1osRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVqQixhQUFNLENBQUMsU0FBUyxDQUFvQixNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDckQsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsVUFBVTtZQUNoQixHQUFHLEVBQUUsTUFBTTtZQUNYLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNsQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDWixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyREFBMkQsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBVztRQUNuRixJQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFVLENBQUMsSUFBSSxFQUFFO1lBQ2hDLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE1BQU0sRUFBRTtnQkFDTixNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsd0JBQXdCLEVBQUM7Z0JBQ3pDLEtBQUssRUFBRSxNQUFNO2FBQ2Q7U0FDRixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVsQixhQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7QW5jZXN0b3JQYXJzZX0gZnJvbSAnLi4vLi4vLi4vc3JjL2NvbXBpbGUvZGF0YSc7XG5pbXBvcnQge0xvb2t1cE5vZGV9IGZyb20gJy4uLy4uLy4uL3NyYy9jb21waWxlL2RhdGEvbG9va3VwJztcbmltcG9ydCB7cGFyc2VUcmFuc2Zvcm1BcnJheX0gZnJvbSAnLi4vLi4vLi4vc3JjL2NvbXBpbGUvZGF0YS9wYXJzZSc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vLi4vc3JjL2xvZyc7XG5pbXBvcnQge1ZnTG9va3VwVHJhbnNmb3JtfSBmcm9tICcuLi8uLi8uLi9zcmMvdmVnYS5zY2hlbWEnO1xuaW1wb3J0IHtwYXJzZVVuaXRNb2RlbH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmRlc2NyaWJlKCdjb21waWxlL2RhdGEvbG9va3VwJywgZnVuY3Rpb24oKSB7XG4gIGl0KCdzaG91bGQgcGFyc2UgbG9va3VwIGZyb20gYXJyYXknLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbW9kZWwgPSBwYXJzZVVuaXRNb2RlbCh7XG4gICAgICAnZGF0YSc6IHsndXJsJzogJ2RhdGEvbG9va3VwX2dyb3Vwcy5jc3YnfSxcbiAgICAgICd0cmFuc2Zvcm0nOiBbe1xuICAgICAgICAnbG9va3VwJzogJ3BlcnNvbicsXG4gICAgICAgICdmcm9tJzoge1xuICAgICAgICAgICdkYXRhJzogeyd1cmwnOiAnZGF0YS9sb29rdXBfcGVvcGxlLmNzdid9LFxuICAgICAgICAgICdrZXknOiAnbmFtZScsXG4gICAgICAgICAgJ2ZpZWxkcyc6IFsnYWdlJywgJ2hlaWdodCddXG4gICAgICAgIH1cbiAgICAgIH1dLFxuICAgICAgJ21hcmsnOiAnYmFyJyxcbiAgICAgICdlbmNvZGluZyc6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCB0ID0gcGFyc2VUcmFuc2Zvcm1BcnJheShudWxsLCBtb2RlbCwgbmV3IEFuY2VzdG9yUGFyc2UpO1xuICAgIGFzc2VydC5kZWVwRXF1YWw8VmdMb29rdXBUcmFuc2Zvcm0+KCh0IGFzIExvb2t1cE5vZGUpLmFzc2VtYmxlKCksIHtcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxuICAgICAgZnJvbTogJ2xvb2t1cF8wJyxcbiAgICAgIGtleTogJ25hbWUnLFxuICAgICAgZmllbGRzOiBbJ3BlcnNvbiddLFxuICAgICAgdmFsdWVzOiBbJ2FnZScsICdoZWlnaHQnXVxuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGNyZWF0ZSBub2RlIGZvciBmbGF0IGxvb2t1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBsb29rdXAgPSBuZXcgTG9va3VwTm9kZShudWxsLCB7XG4gICAgICAgICdsb29rdXAnOiAncGVyc29uJyxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgJ2RhdGEnOiB7J3VybCc6ICdkYXRhL2xvb2t1cF9wZW9wbGUuY3N2J30sXG4gICAgICAgICAgJ2tleSc6ICduYW1lJyxcbiAgICAgICAgICAnZmllbGRzJzogWydhZ2UnLCAnaGVpZ2h0J11cbiAgICAgICAgfVxuICAgICAgfSwgJ2xvb2t1cF8wJyk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsPFZnTG9va3VwVHJhbnNmb3JtPihsb29rdXAuYXNzZW1ibGUoKSwge1xuICAgICAgdHlwZTogJ2xvb2t1cCcsXG4gICAgICBmcm9tOiAnbG9va3VwXzAnLFxuICAgICAga2V5OiAnbmFtZScsXG4gICAgICBmaWVsZHM6IFsncGVyc29uJ10sXG4gICAgICB2YWx1ZXM6IFsnYWdlJywgJ2hlaWdodCddXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY3JlYXRlIG5vZGUgZm9yIG5lc3RlZCBsb29rdXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbG9va3VwID0gbmV3IExvb2t1cE5vZGUobnVsbCwge1xuICAgICAgICAnbG9va3VwJzogJ3BlcnNvbicsXG4gICAgICAgICdmcm9tJzoge1xuICAgICAgICAgICdkYXRhJzogeyd1cmwnOiAnZGF0YS9sb29rdXBfcGVvcGxlLmNzdid9LFxuICAgICAgICAgICdrZXknOiAnbmFtZSdcbiAgICAgICAgfSxcbiAgICAgICAgJ2FzJzogJ2ZvbydcbiAgICAgIH0sICdsb29rdXBfMCcpO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbDxWZ0xvb2t1cFRyYW5zZm9ybT4obG9va3VwLmFzc2VtYmxlKCksIHtcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxuICAgICAgZnJvbTogJ2xvb2t1cF8wJyxcbiAgICAgIGtleTogJ25hbWUnLFxuICAgICAgZmllbGRzOiBbJ3BlcnNvbiddLFxuICAgICAgYXM6IFsnZm9vJ11cbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCB3YXJuIGlmIGZpZWxkcyBhcmUgbm90IHNwZWNpZmllZCBhbmQgYXMgaXMgbWlzc2luZycsIGxvZy53cmFwKChsb2NhbExvZ2dlcikgPT4ge1xuICAgIGNvbnN0IGxvb2t1cCA9IG5ldyBMb29rdXBOb2RlKG51bGwsIHtcbiAgICAgICAgJ2xvb2t1cCc6ICdwZXJzb24nLFxuICAgICAgICAnZnJvbSc6IHtcbiAgICAgICAgICAnZGF0YSc6IHsndXJsJzogJ2RhdGEvbG9va3VwX3Blb3BsZS5jc3YnfSxcbiAgICAgICAgICAna2V5JzogJ25hbWUnXG4gICAgICAgIH1cbiAgICAgIH0sICdsb29rdXBfMCcpO1xuICAgIGxvb2t1cC5hc3NlbWJsZSgpO1xuXG4gICAgYXNzZXJ0LmVxdWFsKGxvY2FsTG9nZ2VyLndhcm5zWzBdLCBsb2cubWVzc2FnZS5OT19GSUVMRFNfTkVFRFNfQVMpO1xuICB9KSk7XG59KTtcbiJdfQ==