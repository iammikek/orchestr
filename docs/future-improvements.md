# Future Improvements

## Traits Refactoring (Deferred)

**Goal:** Refactor all mixins to use `@orchestr-sh/traits` for better PHP-like syntax and automatic TypeScript support.

### Current Mixins to Migrate
1. **Dispatchable** (Events) - Low risk, good starting point
2. **HasDynamicRelations** (Ensemble) - Medium risk, uses Proxies
3. **HasRelationships** (Ensemble) - High risk, core ORM functionality

### Benefits
- Eliminate need for `EventClass` type helper
- More PHP-like trait syntax
- Better TypeScript inference
- Cleaner, more maintainable code

### Prerequisites Before Starting
1. ✅ Validate `@orchestr-sh/traits` handles:
   - Static methods (e.g., `Dispatchable.dispatch()`)
   - Property conflicts between traits
   - Interaction with existing decorators (@DynamicRelation)
   - Proxy objects (HasDynamicRelations)
2. ✅ Create POC with Dispatchable trait only
3. ✅ Verify test coverage is sufficient to catch regressions
4. ✅ Gather user feedback on current DX - is this actually a pain point?

### Migration Strategy (When Ready)
**Phase 1:** Dispatchable trait (lowest risk)
- Migrate Events/Concerns/Dispatchable to use traits
- Ship and validate in production
- Measure DX improvement

**Phase 2:** HasDynamicRelations (if Phase 1 succeeds)
- More complex due to Proxy usage
- Test thoroughly with all relationship types

**Phase 3:** HasRelationships (highest risk, save for last)
- Core ORM functionality
- Affects all models and relationships
- Extensive testing required

### Decision: Deferred
**Reason:** Current implementation is production-ready (9.9/10 code review). The TypeScript typing issue has documented workarounds. No user pain point driving this change. Premature to refactor stable code.

**Revisit when:**
- Users report DX friction with current approach
- `@orchestr-sh/traits` is proven in production
- We have capacity for the migration effort
