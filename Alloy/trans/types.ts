module trans/types

imports

	src-gen/signatures/Alloy-sig
	types-manual

type rules // references

	Ref(e) : ty
	where definition of e : ty

	FieldRef(e, f): f-ty
	where definition of f : f-ty

relations // subtype

	define transitive <sub:

type rules // subtype

	SigDecl(a, [s], Some(Extends(super)), c, d) :-
  where super : super-ty
    and store s <sub: super-ty

type rules // union types

	RefUnion(a, b)
+	Union(a, b): ty
	where a : a-ty
	  and b : b-ty
	  and Union([a-ty, b-ty]) => ty

type rules // relation types

	Arrow(a, a-mul, b-mul, b): rel-ty
	where a : a-ty
	  and b : b-ty
	  and Rel([a-ty, b-ty]) => rel-ty

type rules