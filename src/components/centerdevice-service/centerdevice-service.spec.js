describe('Midway: Testing Modules', function() {
	describe('centerdeviceService Module:', function() {
		var module;

		before(function() {
			module = angular.module('centerdeviceService');
		});

		it("should be registered", function() {
			expect(module).not.to.equal(null);
		});

		describe("Dependencies: ", function() {
			var deps;
			var hasModule = function(module) {
				return deps.indexOf(module) >= 0;
			};

			before(function() {
				deps = module.value('appName').requires;
			});

			it("should have configurationService as a dependency", function() {
				expect(hasModule('configurationService')).to.equal(true);
			});
		});

	});
});